import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

question:{
type:String,
required:true
},

options:[String],

answer:{
type:String,
required:true
},

explanation:String,

domain:{
type:String,
required:true
},

difficulty:{
type:String,
default:"medium"
}

},{timestamps:true});

export default mongoose.model("Question",questionSchema);