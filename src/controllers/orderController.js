const axios = require('axios');
const orders = require('../models/orderModel'); 

const INVENTORY_URL = process.env.INVENTORY_SERVICE_URL || 'http://inventory-service:9697/api';

exports.createOrder = async (req, res) => {
    const { productId, quantity, customerName } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ message: "Product ID dan Quantity wajib diisi!" });
    }

    try {
        console.log(`[Order Service] Memproses order: Produk ${productId}, Jumlah ${quantity}`);

        try {
            const checkResponse = await axios.post(`${INVENTORY_URL}/products/${productId}/check-availability`, {
                quantity: parseInt(quantity)
            });

            // Kalau gudang bilang stok tidak cukup/false
            if (!checkResponse.data.data.available) {
                return res.status(400).json({ 
                    message: "Stok barang tidak cukup!",
                    sisaStok: checkResponse.data.data.currentStock
                });
            }
        } catch (error) {
            console.error("Gagal cek stok:", error.message);
            if (error.response && error.response.status === 404) {
                return res.status(404).json({ message: "Produk tidak ditemukan di Inventory" });
            }
            throw error; 
        }
        try {
            await axios.post(`${INVENTORY_URL}/products/${productId}/reduce`, {
                quantity: parseInt(quantity),
                reason: `Order baru dari ${customerName || 'Pelanggan'}`
            });
            
            console.log("[Order Service] Sukses mengurangi stok di Inventory");

        } catch (inventoryError) {
            console.error("[Order Service] Gagal mengurangi stok:", inventoryError.message);
            return res.status(502).json({ 
                message: "Gagal memproses order. Inventory Service bermasalah.",
                details: inventoryError.response?.data || inventoryError.message
            });
        }

        const newOrder = {
            id: orders.length + 1,
            productId,
            quantity: parseInt(quantity),
            customerName: customerName || "Guest",
            status: 'CONFIRMED',
            createdAt: new Date()
        };

        orders.push(newOrder);

        return res.status(201).json({
            message: "Order berhasil dibuat",
            data: newOrder
        });

    } catch (error) {
        console.error("Internal Server Error:", error.message);
        return res.status(500).json({ message: "Terjadi kesalahan pada server Order" });
    }
};

exports.getAllOrders = (req, res) => {
    res.json({ data: orders });
};

exports.getOrderById = (req, res) => {
    const order = orders.find(o => o.id == parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: "Order tidak ditemukan" });
    res.json({ data: order });
};