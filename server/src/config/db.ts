import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from 'dotenv'
dotenv.config()
const connectionString = process.env.DATABASE_URL;
if(!connectionString){
    throw new Error('database url env var is not set')
}
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);


export const prisma = new PrismaClient({ adapter });