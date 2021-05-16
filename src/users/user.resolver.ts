import auth from "../common/middlewares/auth";
import UserRepository from "./user.repository";

const repository = new UserRepository();

class UserResolvers {
  private getUsers(root, { query = {}, context }) {
    console.log("current context", context);
    return repository.filter(query);
  }

  private login(root, { input }) {
    return repository.login(input);
  }

  @auth.require()
  createUser(root, { input }) {
    return repository.create(input);
  }

  @auth.require()
  updateUser(root, { id, input }) {
    return repository.update(id, input);
  }

  @auth.require()
  deleteUser(root, { id }) {
    return repository.delete(id);
  }

  public resolvers = {
    Query: {
      getUsers: this.getUsers,
    },
    Mutation: {
      createUser: this.createUser,
      login: this.login,
      updateUser: this.updateUser,
      deleteUser: this.deleteUser,
    },
  };
}

export default new UserResolvers().resolvers;
