import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    insurance: {
        type: String,
        required: true
    }
}, {timestamps: true})
const User = mongoose.model("User", userSchema);
export default User;