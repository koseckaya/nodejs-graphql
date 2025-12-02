import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { MemberTypeType } from '../member-type/member-type-type.js';
import { Shared } from '../../types/shared.js';
import { Profile } from '@prisma/client';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: {
      type: MemberTypeType,
      resolve: async (profile: Profile, _, { loaders }: Shared) => {
        return loaders.memberTypeLoader.load(profile.memberTypeId);
      },
    },
  }),
});
