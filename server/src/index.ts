import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { prisma } from './config/db';
import { auth } from './config/auth';


dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
     methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 

}));
app.use(express.json());
app.all("/api/auth/*", toNodeHandler(auth));



// Standard Routes
app.get('/', (req, res) => res.json({ message: 'API running' }));

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

const PORT = process.env.PORT || 4000;

// console.log('DATABASE_URL:', process.env.DATABASE_URL);
app.listen(PORT, async () => {
    console.log(`Server running on      ${PORT}`);
    try {
        
        await prisma.$connect();
        console.log('Database connected');
    } catch (error) {
        console.error('DB connection failed', error);
    }
});