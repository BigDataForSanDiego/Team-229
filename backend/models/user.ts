import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  insurance: string;
}
const userSchema = new Schema<IUser>({
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
const User = model<IUser>("User", userSchema);
export default User;