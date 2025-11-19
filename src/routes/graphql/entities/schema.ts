import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userResolve } from './user/user-resolve.js';
import { memberTypeResolve } from './member-type/member-type-resolve.js';
import { postResolve } from './post/post-resolve.js';
import { profileResolve } from './profile/profile-resolve.js';
import { UserType } from './user/user-type.js';
import { MemberTypeType } from './member-type/member-type-type.js';
import { PostType } from './post/post-type.js';
import { ProfileType } from './profile/profile-type.js';

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userResolve,
    ...memberTypeResolve,
    ...postResolve,
    ...profileResolve,
  },
});

export const schema = new GraphQLSchema({
  types: [UserType, MemberTypeType, PostType, ProfileType],
  query: rootQuery,
});
