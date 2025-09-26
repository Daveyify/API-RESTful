import mongoose from 'mongoose';


// definition of the schema for the documents in the database
const DocumentSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: false,
        },
        name:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        category:
        {
            type: String,
            required: true
        },
        price:
        {
            type: Number,
            required: true,
            default: 0
        },
        availability:
        {
            type: Boolean,
            required: true,
            default: true
        },
        image:
        {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

export const Product = mongoose.model('Product', DocumentSchema);
