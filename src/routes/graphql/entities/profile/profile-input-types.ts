import { Static } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { createProfileSchema } from '../../../profiles/schemas.js';
import { UUIDType } from '../../types/uuid.js';
import { MemberTypeIdEnum } from '../member-type/member-type-type.js';

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
    userId: { type: UUIDType },
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});

export type CreateProfileDto = Static<(typeof createProfileSchema)['body']>;
export type ChangeProfileDto = Static<(typeof createProfileSchema)['body']>;
