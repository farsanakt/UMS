import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../routes/user_routes.js';
import authRoutes from '../routes/auth_route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({

        success: false,
        message,
        statusCode,

    });
});

app.listen(3000, () => {
    console.log('Server is running');
});
