require('dotenv').config();
const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(cors());
app.use(express.json()); 

app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Order Service Microservice is Running...');
});

app.listen(PORT, () => {
    console.log(`Order Service berjalan di port ${PORT}`);
});