* **Nama:** `Padmanabha Adyaksa`
* **NIM:** `18222142`

* **Production URL:** https://pad.theokaitou.my.id
* **Port:** `8128`
* **GitHub Repository:** https://github.com/adyaksapad22/order-service

---

# Order Service Microservice

Microservice untuk mengelola pemesanan (order) pada sistem kantin kampus ITB. Layanan ini dibangun menggunakan Node.js dan Express.js, serta terintegrasi langsung dengan **Inventory Service** untuk validasi dan manajemen stok otomatis.

### 🚀 Fitur Utama

* **Create Order:** Menerima pesanan dan membuat ID transaksi unik.
* **Real-time Stock Validation:** Mengecek ketersediaan stok ke Inventory Service sebelum order diproses.
* **Automatic Stock Reduction:** Mengurangi stok di Inventory Service secara otomatis saat order berhasil.
* **Get All Orders:** Melihat riwayat seluruh pesanan yang masuk.
* **Get Order Detail:** Melihat detail pesanan berdasarkan ID.

### 🛠️ Cara Menjalankan (Lokal)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/adyaksapad22/order-service
    cd tugas-tst/order-backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment (Opsional)**
    Buat file `.env` (jika ingin mengubah port atau URL Inventory):
    ```env
    PORT=3001
    INVENTORY_SERVICE_URL=http://localhost:8128/api
    ```

4.  **Jalankan Server**
    ```bash
    npm start
    ```
### Deploy dengan Docker

Build & Run

```bash
# Build image
docker build -t order-service .

# Run container 
docker run -d -p 8128:3001 --network jaringan-kantin-itb --name order-service-pad order-service

# Check logs
docker logs order-service-pad

```

---

### API Endpoints

* **Production:** `http://pad.theokaitou.my.id`
* **Local:** `http://localhost:8128`

### 📡 Order Service API Endpoints

Berikut adalah daftar endpoint yang tersedia untuk Order Service:

### 1. POST /orders
(Buat order baru, validasi & kurangi stok via call ke Inventory Service)

```bash
curl -X POST http://pad.theokaitou.my.id/orders \
  -H "Content-Type: application/json" \
  -d '{
        "productId": "P001",
        "quantity": 1,
        "customerName": "Padmanabha "
    }'

```

### 2. GET /orders

(Melihat daftar seluruh order yang masuk)

```bash
curl http://pad.theokaitou.my.id/orders

```

### 3. GET /orders/{id}

(Melihat detail order spesifik berdasarkan ID)

```bash
curl http://pad.theokaitou.my.id/orders/1

```
