import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    slug: String
  }

  type Login {
    name: String
    email: String
    token: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input QueryParamsInput {
    skip: Int
    limit: Int
  }

  type Query {
    getUsers(query: QueryParamsInput): [User]
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  type Mutation {
    createUser(input: UserInput!): User
    login(input: LoginInput): Login
    updateUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;
