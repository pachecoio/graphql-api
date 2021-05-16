import { ApolloError } from "apollo-server-errors";
import mongoose from "mongoose";

export default class BaseRepository {
  model!: any;
  constructor(model: any) {
    this.model = model;
  }

  filter(query) {
    let { skip = 0, limit = 10, ...args } = query;

    for (const item of Object.keys(args)) {
      args[item] = new RegExp(args[item], "i");
    }

    if (args._id) {
      try {
        args._id = new mongoose.mongo.ObjectId(args._id);
      } catch (error) {
        // tslint:disable-next-line: no-console
        console.log("not able to generate mongoose id with content", args._id);
      }
    }

    return this.model.find(args).skip(skip).limit(limit);
  }

  get(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ApolloError(`Invalid id ${id}`);
    return this.model.findById(id);
  }

  async create(data) {
    const item: any = await this.model.create(data);
    if (!item) throw new ApolloError("Failed creating item");
    return item;
  }

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ApolloError(`Invalid id ${id}`);
    const item = await this.model.findById(id);
    if (!item) throw new ApolloError(`Item not found with id ${id}`);
    Object.keys(data).forEach((key) => {
      item[key] = data[key];
    });
    return item.save();
  }

  async delete(id) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new ApolloError(`Item not found with id ${id}`);
  }
}
