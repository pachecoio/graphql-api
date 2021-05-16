import { ApolloServer } from "apollo-server";
import { Connection } from "./config/database";
import defaultSchema from "./schemas";

export class Server {
  private readonly _app: ApolloServer;
  private readonly _db: Connection;
  private _schema;

  constructor(
    schema = defaultSchema,
    connection: Connection = new Connection()
  ) {
    this._schema = schema;
    this._app = new ApolloServer({
      ...this._schema,
      context: ({ req }) => {
        return { req };
      },
    });
  }

  get app(): ApolloServer {
    return this._app;
  }

  get db(): Connection {
    return this._db;
  }

  public start() {
    return this.app.listen(process.env.PORT || 5000).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }
}

export default new Server();
