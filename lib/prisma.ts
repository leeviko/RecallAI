import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['info', 'query', 'warn', 'error'],
});

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
