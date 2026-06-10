import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

username:{type:String,required:true,unique:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},

progress:[{type:mongoose.Schema.Types.ObjectId,ref:"Course"}],


completedCourses: [

  {

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },

    completedAt: {
      type: Date,
      default: Date.now
    }

  }

],


lessonProgress: [

  {

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },

    completedLessons: [
      {
        type: String
      }
    ]
    
  }

],


lastExamScore:{type:Number,default:0},

role:{type:String,default:"student"},

examAttempts: [
  {
    score: Number,
    date: {
      type: Date,
      default: Date.now
    },
    domains: {
      general: Number,
      threats: Number,
      architecture: Number,
      operations: Number,
      governance: Number
    }
  }
],

domainScores:{
general:{type:Number,default:0},
threats:{type:Number,default:0},
architecture:{type:Number,default:0},
operations:{type:Number,default:0},
governance:{type:Number,default:0}
}

},{timestamps:true});

userSchema.pre("save",async function(){
if(!this.isModified("password")) return;
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword=async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
};

export default mongoose.model("User",userSchema);