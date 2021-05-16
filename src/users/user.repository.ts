import User from "./user.model";
import BaseRepository from "../common/repositories/base.repository";
import { decrypt } from "../common/helpers/utils";
import { HttpRequestError } from "../common/exceptions";
import { generate } from "../common/auth/jwt";
import { ApolloError } from "apollo-server-errors";

export default class UserRepository extends BaseRepository {
  constructor(model = User) {
    super(model);
  }

  async login({ email, password }) {
    const user = await this.model.findOne({
      email,
    });
    if (!user) return new ApolloError(`User not found with email ${email}`);
    const valid = await decrypt(password, user.password);
    if (!valid) throw new ApolloError(`Invalid credentials`);
    const token = await generate(user);
    if (token.error) {
      return new ApolloError(token.message);
    }

    return {
      name: user.name,
      email: user.email,
      token: token.token,
    };
  }
}
