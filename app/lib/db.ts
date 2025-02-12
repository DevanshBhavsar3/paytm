import { PrismaClient } from "@prisma/client";

function prismaClientSignleton() {
  return new PrismaClient();
}

type PrismaClientSignleton = ReturnType<typeof prismaClientSignleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSignleton;
};

const prisma = globalForPrisma.prisma || prismaClientSignleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
