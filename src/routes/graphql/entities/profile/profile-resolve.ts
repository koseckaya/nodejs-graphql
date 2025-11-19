import { GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Shared } from '../../types/shared.js';
import { ProfileType } from './profile-type.js';

export const profileResolve = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_, __, { prisma }: Shared) => {
      const profiles = await prisma.profile.findMany();

      return profiles;
    },
  },
  profile: {
    type: ProfileType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_, args: { id: string }, { prisma }: Shared) => {
      const profile = await prisma.profile.findUnique({
        where: { id: args.id },
      });

      return profile;
    },
  },
};
