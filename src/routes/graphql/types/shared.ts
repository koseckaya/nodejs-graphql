import { PrismaClient } from '@prisma/client';
import { DataLoaders } from '../data-loaders/data-loaders.js';

export interface Shared {
  prisma: PrismaClient;
  loaders: DataLoaders;
}
