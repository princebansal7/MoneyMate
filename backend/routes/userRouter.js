import express from "express";
import jwt from "jsonwebtoken";
import User from "../db.js";
import { JWT_SECRET } from "../config.js";
import {
    signupInputValidation,
    signinInputValidation,
} from "../middlewares/inputValidator.js";
import {
    userSignupValidation,
    userSigninValidation,
} from "../middlewares/userValidator.js";

const router = express.Router();

router.post(
    "/signup",
    signupInputValidation,
    userSignupValidation,
    async (req, res) => {
        const { firstName, lastName, username, password } = req.body;
        try {
            const user = await User.create({
                username,
                firstName,
                lastName,
                password,
            });
            const userId = user._id;
            const token = jwt.sign({ userId }, JWT_SECRET);
            res.status(200).json({
                msg: "User Created successfully",
                userId: token,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
);

router.post(
    "/signin",
    signinInputValidation,
    userSigninValidation,
    async (req, res) => {
        const { username } = req.body;
        try {
            const user = await User.findOne({ username });
            const userId = user._id;
            const token = jwt.sign({ userId }, JWT_SECRET);
            res.status(200).json({
                jwtToken: token,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
);

export default router;
