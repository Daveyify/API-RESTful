import { Product } from './documents.js'; // Named import
import mongoose from 'mongoose';

export class MongoService {

    constructor(model) {
        this.Model = model;
    }

    // async function to create a new document in the collection
    async postDocument(dataObject, customId) {
        try {
            const docData = customId ? { _id: customId, ...dataObject } : dataObject;
            const newDoc = new this.Model(docData);
            const savedDoc = await newDoc.save();
            console.log("Created document with ID:", savedDoc._id);
            return savedDoc;
        } catch (error) {
            console.error("ERROR creating the document:", error);
            throw new Error(`ERROR creating the document: ${error.message}`);
        }
    }

    // async function to recover all documents from the collection
    async getAllDocuments() {
        try {
            return await this.Model.find({});
        } catch (error) {
            throw new Error(`ERROR getting documents: ${error.message}`);
        }
    }

    // async function to recover a document by its ID
    async getDocumentById(id) {
        try {
            return await this.Model.findById(id);
        } catch (error) {
            throw new Error(`ERROR getting documento: ${error.message}`);
        }
    }

    // async function to recover documents by category
    async getDocumentsByCategory(category) {
        try {
            return await this.Model.find({ category: category });
        } catch (error) {
            throw new Error(`ERROR getting documents by category: ${error.message}`);
        }                   
    }

    // async function to update a document by its ID
    async updateDocument(id, updateData) {
        try {
            return await this.Model.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error actualizando documento: ${error.message}`);
        }
    }

    // async function to delete a document by its ID
    async deleteDocument(id) {
        try {
            return await this.Model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`ERROR deleting document: ${error.message}`);
        }
    }
}