const mongoose = require('mongoose');

import { connectDB } from './connection.js';
import { product } from '../modules/documents.js'; 
import { mongoose } from 'mongoose';

export class MongoService {
    constructor(Model) {
        this.Model = Model;
    }

    
    async postDocument(dataObject, customId = null) {
        try {
            const docData = customId ? { _id: customId, ...dataObject } : dataObject;
            const newDoc = new this.Model(docData);
            const savedDoc = await newDoc.save();
            console.log("Documento creado con ID:", savedDoc._id);
            return savedDoc;
        } catch (error) {
            console.error("Error al crear el documento:", error);
            throw new Error(`Error creando documento: ${error.message}`);
        }
    }


    async getAllDocuments() {
        try {
            return await this.Model.find({});
        } catch (error) {
            throw new Error(`Error obteniendo documentos: ${error.message}`);
        }
    }

    async getDocumentById(id) {
        try {
            return await this.Model.findById(id);
        } catch (error) {
            throw new Error(`Error obteniendo documento: ${error.message}`);
        }
    }

    // Métodos adicionales útiles
    async updateDocument(id, updateData) {
        try {
            return await this.Model.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error actualizando documento: ${error.message}`);
        }
    }

    async deleteDocument(id) {
        try {
            return await this.Model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error eliminando documento: ${error.message}`);
        }
    }
}