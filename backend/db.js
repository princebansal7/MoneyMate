import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(`${process.env.DB_URL}/payments-db`);

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
    first_name: {
        type: true,
        maxLength: 30,
        trim: true,
        required: true,
    },
    last_name: {
        type: true,
        maxLength: 30,
        trim: true,
        default: null,
    },
    password: {
        type: string,
        minLength: 6,
        required: true,
    },
});

export const User = mongoose.model("User", UserSchema);
