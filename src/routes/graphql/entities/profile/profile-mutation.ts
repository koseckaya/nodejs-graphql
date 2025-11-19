import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { Shared } from '../../types/shared.js';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from './profile-type.js';
import {
  ChangeProfileDto,
  ChangeProfileInput,
  CreateProfileDto,
  CreateProfileInput,
} from './profile-input-types.js';

export const profileMutations = {
  createProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: {
      dto: { type: new GraphQLNonNull(CreateProfileInput) },
    },
    resolve: async (_, args: { dto: CreateProfileDto }, { prisma }: Shared) => {
      return await prisma.profile.create({
        data: args.dto,
      });
    },
  },
  changeProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInput) },
    },
    resolve: async (
      _,
      args: { id: string; dto: ChangeProfileDto },
      { prisma }: Shared,
    ) => {
      return await prisma.profile.update({
        where: { id: args.id },
        data: args.dto,
      });
    },
  },
  deleteProfile: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args: { id: string }, { prisma }: Shared) => {
      await prisma.profile.delete({
        where: { id: args.id },
      });
      return true;
    },
  },
};
