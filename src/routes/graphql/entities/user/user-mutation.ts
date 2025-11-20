import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { Shared } from '../../types/shared.js';
import { UUIDType } from '../../types/uuid.js';
import {
  ChangeUserDto,
  ChangeUserInput,
  CreateUserDto,
  CreateUserInput,
} from './user-input-types.js';
import { UserType } from './user-type.js';

export const userMutations = {
  createUser: {
    type: new GraphQLNonNull(UserType),
    args: {
      dto: {
        type: CreateUserInput,
      },
    },
    resolve: async (_, args: { dto: CreateUserDto }, { prisma }: Shared) => {
      const user = await prisma.user.create({
        data: args.dto,
      });

      return user;
    },
  },
  changeUser: {
    type: new GraphQLNonNull(UserType),
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeUserInput },
    },
    resolve: async (_, args: { id: string; dto: ChangeUserDto }, { prisma }: Shared) => {
      return await prisma.user.update({
        where: { id: args.id },
        data: args.dto,
      });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_, args: { id: string }, { prisma }: Shared) => {
      await prisma.user.delete({
        where: { id: args.id },
      });
      return true;
    },
  },
  subscribeTo: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      args: { userId: string; authorId: string },
      { prisma }: Shared,
    ) => {
      await prisma.subscribersOnAuthors.create({
        data: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      });
      return true;
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      args: { userId: string; authorId: string },
      { prisma }: Shared,
    ) => {
      await prisma.subscribersOnAuthors.deleteMany({
        where: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      });
      return true;
    },
  },
};
