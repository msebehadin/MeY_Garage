"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('database url env var is not set');
}
let prisma;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    const pool = new pg_1.default.Pool({ connectionString });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    exports.prisma = prisma = new client_1.PrismaClient({ adapter });
}
else {
    exports.prisma = prisma = new client_1.PrismaClient();
}
