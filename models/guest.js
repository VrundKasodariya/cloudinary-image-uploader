import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    guestId :{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    uploads:{
        type:Number,
        default:0
    },
    images:[String]
});

const Guest = mongoose.model("Guest",guestSchema);
export default Guest;