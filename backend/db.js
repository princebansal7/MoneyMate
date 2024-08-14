import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(`${process.env.DB_URL}/payment_app`);

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    firstName: {
        type: String,
        maxLength: 30,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        maxLength: 30,
        trim: true,
        default: null,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
