import express from 'express';
import productRoutes from './routes/productRoutes.js';
import { connectDB } from './modules/connection.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// connect to MongoDB
await connectDB();

// import and use product routes
app.use('/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});