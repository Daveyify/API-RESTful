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

// READ all products with pagination and filtering
app.get('/getProducts', async (req, res) => {
    try {
        let { page, limit, category, availability, price } = req.query;

        const filters = {};

        if (category){
            filters.category = category;
        }
        if(availability !== undefined )
        {
            filters.availability = availability === 'true';
        }
        if (price){
            filters.price = Number(price);
        }   

        const result = await productService.getDocuments(filters, page, limit);

        if (result.length === 0) {
            res.status(404).send("Data not found.");
        }
        else {
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
app.get('/getProductsID/:id', async (req, res) => {
    try {

        const result = await productService.getDocumentById(req.params.id);

        if (result.length === 0) {
            res.status(404).send("Data not found.");
        }
        else {
            res.status(200).json(
                {
                    message: 'Product readed successfully',
                    product: result
                }
            );
        }
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ error: 'Error getting products' });
    }
});

// UPDATE the product by id
app.put('/updateProducts/:id', async (req, res) => {
    try {
        const updateData = req.body;
        const result = await productService.updateDocument(req.params.id, updateData);  
        res.status(200).json({
            message: 'Product updated successfully',
            product: result
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }           
});

//
app.delete('/deleteProducts/:id', async (req, res) => {
    try {
        const result = await productService.deleteDocument(req.params.id);  
        res.status(200).json({
            message: 'Product deleted successfully',
            product: result
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }      
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});