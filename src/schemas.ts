import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";
import userSchema from "./users/user.schema";
import userResolver from "./users/user.resolver";

const typeDefs = mergeTypeDefs([userSchema]);

const resolvers = mergeResolvers([userResolver]);

export default {
  typeDefs,
  resolvers,
};
