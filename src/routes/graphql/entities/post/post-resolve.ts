import { GraphQLList } from 'graphql';
import { PostType } from './post-type.js';
import { Shared } from '../../types/shared.js';
import { UUIDType } from '../../types/uuid.js';

export const postResolve = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_, __, { prisma }: Shared) => {
      const posts = await prisma.post.findMany();

      return posts;
    },
  },
  post: {
    type: PostType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_, args: { id: string }, { prisma }: Shared) => {
      const post = await prisma.post.findUnique({
        where: { id: args.id },
      });

      return post;
    },
  },
};
