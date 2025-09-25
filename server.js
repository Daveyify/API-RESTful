import express from 'express';
import mongoose from 'mongoose';
import { Product } from './modules/documents.js';
import { MongoService } from './modules/services.js';
import { connectDB } from './modules/connection.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// connect to MongoDB
await connectDB();

const productService = new MongoService(Product);

// CREATE products to the database
app.post('/postProducts', async (req, res) => {
    try {
        const dataObject = req.body;
        const customId = req.body.id || null;

        const result = await productService.postDocument(dataObject, customId);
        res.status(200).json({
            message: 'Product created successfully',
            product: result
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            error: 'Error creating product',
            details: error.message
        });
    }
});

// READ all products
app.get('/getAllProducts', async (req, res) => {
    try {
        if (result.length === 0) {
            res.status(404).send("Data not found.");
        }
        else {
            const result = await productService.getAllDocuments();
            res.status(200).json(
                {
                    message: 'All products readed successfully',
                    product: result
                }
            );
        }
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ error: 'Error getting products' });
    }
});

// READ the product by id
app.get('/getProducts/:id', async (req, res) => {
    try {
        if (result.length === 0) {
            res.status(404).send("Data not found.");
        }
        else {
            const result = await productService.getAllDocuments();
            res.status(200).json(
                {
                    message: 'All products readed successfully',
                    product: result
                }
            );
        }
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ error: 'Error getting products' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});