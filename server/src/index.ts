import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./lib/auth.js"; // Adjust path to your auth config
import { prisma } from './config/db.js';

dotenv.config();

const app = express();

// 1. CORS - Mandatory for Better-Auth cookies to work across domains
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true 
}));

/**
 * 2. BETTER-AUTH HANDLER
 * In Express 5, the wildcard syntax is strict. Use "/api/auth/*"
 * IMPORTANT: Place this BEFORE express.json() so it can handle raw streams.
 */
// app.all("/api/auth/*", toNodeHandler(auth));

// 3. Body Parser - Only for your custom routes
app.use(express.json());

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

// 4. Start Server with Proper Async Initialization
app.listen(PORT, async () => {
    console.log(`Server running on ${PORT}`);
    try {
        // Prisma 7 handles connection lazily, but manual check is good for logs
        await prisma.$connect();
        console.log('Database connected');
    } catch (error) {
        console.error('DB connection failed', error);
    }
});