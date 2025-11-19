import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './entities/schema.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const validationResults = validate(schema, parse(query), [depthLimit(5)]);

      if (validationResults.length) {
        return {
          errors: validationResults,
        };
      }

      return graphql({
        schema,
        source: query,
        contextValue: { prisma },
        variableValues: variables,
      });
    },
  });
};
export default plugin;
