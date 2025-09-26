export class MongoService {

    constructor(model) {
        this.Model = model;
    }

    // function to create a new document in the collection
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

    // function to recover documents with filters and pagination
    async getDocuments(filters = {}, page, limit) {
        try {

            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;

            const documents = await this.Model.find(filters)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await this.Model.countDocuments(filters);

            return {
                total,
                page: Number(page),
                documents
            };
        } catch (error) {
            throw new Error(`ERROR getting documents: ${error.message}`);
        }
    }

    // function to recover a document by its ID
    async getDocumentById(id) {
        try {
            return await this.Model.findById(id);
        } catch (error) {
            throw new Error(`ERROR getting documento: ${error.message}`);
        }
    }

    // function to update a document by its ID
    async updateDocument(id, updateData) {
        try {
            return await this.Model.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error actualizando documento: ${error.message}`);
        }
    }

    // function to delete a document by its ID
    async deleteDocument(id) {
        try {
            return await this.Model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`ERROR deleting document: ${error.message}`);
        }
    }
}