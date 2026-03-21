"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
app.get('/', (req, res) => res.json({ message: 'API running' }));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/orders', order_routes_1.default);
app.get('/api/health', async (req, res) => {
    try {
        await db_1.prisma.$queryRaw `SELECT 1;`;
        res.json({ status: 'ok', database: 'connected' });
    }
    catch (err) {
        res.status(503).json({ status: 'error', database: 'disconnected' });
    }
});
const PORT = process.env.PORT || 4000;
// console.log('DATABASE_URL:', process.env.DATABASE_URL);
app.listen(PORT, async () => {
    console.log(`Server running on      ${PORT}`);
    try {
        await db_1.prisma.$connect();
        console.log('Database connected');
    }
    catch (error) {
        console.error('DB connection failed', error);
    }
});
