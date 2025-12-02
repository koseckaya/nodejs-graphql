import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { Shared } from '../../types/shared.js';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from './post-type.js';
import {
  ChangePostDto,
  ChangePostInput,
  CreatePostDto,
  CreatePostInput,
} from './post-input-types.js';

export const postMutations = {
  createPost: {
    type: new GraphQLNonNull(PostType),
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInput) },
    },
    resolve: async (_, args: { dto: CreatePostDto }, { prisma }: Shared) => {
      return await prisma.post.create({
        data: args.dto,
      });
    },
  },
  changePost: {
    type: new GraphQLNonNull(PostType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInput) },
    },
    resolve: async (_, args: { id: string; dto: ChangePostDto }, { prisma }: Shared) => {
      return await prisma.post.update({
        where: { id: args.id },
        data: args.dto,
      });
    },
  },
  deletePost: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args: { id: string }, { prisma }: Shared) => {
      await prisma.post.delete({
        where: { id: args.id },
      });
      return true;
    },
  },
};
