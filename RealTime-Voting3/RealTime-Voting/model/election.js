import mongoose from "mongoose";
const ElectionSchema =new mongoose.Schema({
   "title":{type:"string",required:true},
   "type":{type:"string",required:true},
   "numCan":{type:"number",required:true},
   "names":{type:"object",required:true}
},{collection:"elections"});

const model = mongoose.model('ElectionSchema',ElectionSchema);

export default model;