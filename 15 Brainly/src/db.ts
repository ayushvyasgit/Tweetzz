import mongoose, {model , Schema } from "mongoose";

mongoose.connect("mongodb+srv://ayushvyas99199:qegXvJWDh8bkgI1Q@a1.mihxsrj.mongodb.net/brainly");

const UserSchema  = new Schema({
  username : {type : String , unique:true},
  password : String
})
export const UserModel= model( "User",UserSchema);

const ContentSchema = new Schema({
  title : {type :String },
  link: {type :String },
  tags : [{type : mongoose.Types.ObjectId , ref : 'Tag'}],
  type :{type:String},
  userId:{type : mongoose.Types.ObjectId , ref : 'User' , required : true}
})
export const ContentModel = model("Content",ContentSchema);

const LinkSchema = new Schema({
  hash:String ,
  userId:{type:mongoose.Types.ObjectId,ref:'User', required:true,unique:true},
})

export const LinkModel = model("Link" ,LinkSchema);