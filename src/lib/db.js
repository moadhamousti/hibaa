const { PrismaClient } = require("@prisma/client");

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
const db = prisma;

module.exports = { db };
