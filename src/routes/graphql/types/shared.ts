import { PrismaClient } from '@prisma/client';

export interface Shared {
  prisma: PrismaClient;
}
