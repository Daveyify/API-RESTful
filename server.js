import express from 'express';
import mongoose from 'mongoose';

const app = express();

const PORT = 3000;

// Upload products to the database
app.post('/products', async (req, res) => {
    try {
        const productData = req.body;
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});