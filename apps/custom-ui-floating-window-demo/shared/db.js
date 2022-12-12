// Use for building queries and accessing database
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
export default db;
