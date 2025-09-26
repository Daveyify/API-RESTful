import express from 'express';
import { Product } from '../modules/documents.js';
import { MongoService } from '../modules/services.js';

const router = express.Router();
const productService = new MongoService(Product);

// CREATE products to the database
router.post('/', async (req, res) => {
    try {
        const dataObject = req.body;
        const customId = req.body.id || null;

        const result = await productService.postDocument(dataObject, customId);
        res.status(201).json({
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
router.get('/', async (req, res) => {
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

// READ a product by its ID
router.get('/:id', async (req, res) => {
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

// UPDATE a product by its ID
router.put('/:id', async (req, res) => {
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

// DELETE a product by its ID

router.delete('/:id', async (req, res) => {
    try {
        const result = await productService.deleteDocument(req.params.id);  
        res.status(204).json({
            message: 'Product deleted successfully',
            product: result
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }      
});

export default router;
