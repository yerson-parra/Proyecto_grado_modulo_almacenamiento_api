import {Schema, model} from "mongoose";
const userSchema= new Schema({
    username: {
        type: String,
        unique:true,
    },
    email: {
        type: String,
        unique:true,
        required:true,
        trim: true
    },
    password: {
        type: String,
        required:true,
    },
    roles: [
        {
        ref : "Role",
        type: Schema.Types.ObjectId
        },
    ],
}, 
{
    timestamps: true
}
);

export default model('User', userSchema)