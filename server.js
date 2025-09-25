import express from 'express';
import mongoose from 'mongoose';
import { MongoService } from './modules/services.js';   
import { connectDB } from './modules/connection.js';

const app = express();

const PORT = 3000;

// connect to MongoDB
await connectDB();

// upload products to the database
app.post('/postProducts', async (req, res) => {
    try {
        const productData = req.body;
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});