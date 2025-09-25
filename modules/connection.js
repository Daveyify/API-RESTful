const mongoose = require('mongoose');

const uri = 'mongodb+srv://daveyify:23062004@cluster0.quaqidc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// Function to connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();


