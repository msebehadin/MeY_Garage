import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { prisma } from './config/db';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes'
import authRoutes from './routes/auth.routes';


dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true 
}));
app.use(express.json());


app.get('/', (req, res) => res.json({ message: 'API running' }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders',orderRoutes)

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
