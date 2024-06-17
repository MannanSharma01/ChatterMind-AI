import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["assistant", "user"],
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
);


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    chats: {
      type: [chatSchema]
    }
  }
) ;

userSchema.plugin(passportLocalMongoose);    // automatically, in the userSchema, this is added----username----required, unique    password---required

export default mongoose.model("User", userSchema);


