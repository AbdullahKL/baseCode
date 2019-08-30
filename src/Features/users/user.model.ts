// var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;
import mongoose from "mongoose";
import { PassportLocalSchema } from "mongoose";
import passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  admin: {
    default: false,
    type: Boolean
  },
  firstname: {
    default: "",
    type: String
  },
  lastname: {
    default: "",
    type: String
  },
  password: String,
  username: String
});

// UserSchema.methods.getName =  (): string => {
//     const fullName: string = `${this.firstname} ${this.lastname}` ;
//     return fullName ;
// };

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema as PassportLocalSchema);

export default User;
// export default mongoose.model("User", User);
