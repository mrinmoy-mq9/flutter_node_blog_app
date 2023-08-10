import mongoose from "mongoose";

const profile = mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        name:String,
        profession:String,
        DOB:String,
        title:String,
        about:String,
        img:{
            type:String,
            default:""
        }
    },
    {
        timestamp:true,
    }
);

const Profile = mongoose.model("Profile", profile);
export default Profile