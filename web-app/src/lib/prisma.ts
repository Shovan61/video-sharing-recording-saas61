import { PrismaClient } from '../generated/prisma'; 

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let client: PrismaClient;
try {
  client = globalThis.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  console.log('PrismaClient initialized successfully');
} catch (error) {
  console.error('PrismaClient initialization failed:', error);
  throw error;
}

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;
}

export { client };