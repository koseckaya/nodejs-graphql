import { GraphQLList } from 'graphql';
import { MemberTypeIdEnum, MemberTypeType } from './member-type-type.js';
import { Shared } from '../../types/shared.js';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const memberTypeResolve = {
  memberTypes: {
    type: new GraphQLList(MemberTypeType),
    resolve: async (_, __, { prisma }: Shared) => {
      const memberTypes = await prisma.memberType.findMany();

      return memberTypes;
    },
  },
  memberType: {
    type: MemberTypeType,
    args: {
      id: { type: MemberTypeIdEnum },
    },
    resolve: async (_, args: { id: MemberTypeId }, { prisma }: Shared) => {
      const memberType = await prisma.memberType.findUnique({
        where: { id: args.id },
      });

      return memberType;
    },
  },
};
