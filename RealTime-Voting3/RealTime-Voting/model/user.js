import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: { type: "string", required: true, unique: true },
   password: { type: "string", required: true ,minLength:4,maxLength:10},
   email: { type: "string", required: true},
   gender:{type: "string", required: true},
   phone: { type: "string", required: true},
   adharcard: { type: "string", required: true},
   isAdmin:{type: "boolean"}
},
   {
      collection: "users"
   });

const model = mongoose.model('UserSchema', UserSchema);

export default model;