import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const client = new PrismaClient();
export { Prisma };
