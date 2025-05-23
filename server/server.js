import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import journalRouter from "./routes/journalRoutes.js";  
import pixelRoutes from './routes/pixelRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();



const allowedOrigins = ['http://localhost:5173']

app.use(express.json())
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

//API Endpoints
app.get('/', (req, res)=> res.send("API Working"));
app.use('/${import.meta.env.VITE_API_URL}/auth', authRouter);
app.use('/${import.meta.env.VITE_API_URL}/user', userRouter);

// Add near other route uses
app.use('/${import.meta.env.VITE_API_URL}/journal', journalRouter); 

// Add this with your other route imports
app.use('/${import.meta.env.VITE_API_URL}/pixel', pixelRoutes);

module.exports = app;
