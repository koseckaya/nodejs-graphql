import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../profile/profile-type.js';
import { Shared } from '../../types/shared.js';
import { PostType } from '../post/post-type.js';
import { User } from '@prisma/client';
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async (user: User, _, { loaders }: Shared) => {
        return loaders.profileLoader.load(user.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user: User, _, { loaders }) => {
        return loaders.postsLoader.load(user.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user, _, { loaders }) => {
        return loaders.userSubscribedToLoader.load(user.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user, _, { loaders }) => {
        return loaders.subscribedToUserLoader.load(user.id);
      },
    },
  }),
}) as GraphQLObjectType;
