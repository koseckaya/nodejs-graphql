import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userResolve } from './user/user-resolve.js';
import { memberTypeResolve } from './member-type/member-type-resolve.js';
import { postResolve } from './post/post-resolve.js';
import { profileResolve } from './profile/profile-resolve.js';
import { UserType } from './user/user-type.js';
import { MemberTypeType } from './member-type/member-type-type.js';
import { PostType } from './post/post-type.js';
import { ProfileType } from './profile/profile-type.js';
import { userMutations } from './user/user-mutation.js';
import { postMutations } from './post/post-mutation.js';
import { profileMutations } from './profile/profile-mutation.js';

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userResolve,
    ...memberTypeResolve,
    ...postResolve,
    ...profileResolve,
  },
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...postMutations,
    ...profileMutations,
  },
});

export const schema = new GraphQLSchema({
  types: [UserType, MemberTypeType, PostType, ProfileType],
  query: rootQuery,
  mutation: rootMutation,
});
