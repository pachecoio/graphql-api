import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";
import { encrypt } from "../common/helpers/utils";

const schemaName = "users";

export interface User extends Document {
  email: string;
  name: string;
  password: string;
  stripeId: string;
  slug: string;
}

function handleSave(next) {
  const user = this;
  user.slug = slugify(user.name.toLowerCase(), "_");
  if (!user.isModified("password")) {
    console.log("password not modified");
    return next();
  }
  encrypt(user.password).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  slug: String,
});

schema.pre("save", handleSave);

export default mongoose.model<User>(schemaName, schema);
