import express from "express";
import User from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { inputValidation } from "../middlewares/inputValidator.js";
import { userValidation } from "../middlewares/userValidator.js";

const router = express.Router();

router.post("/signup", inputValidation, userValidation, async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    const token = jwt.sign({ username, password }, JWT_SECRET);
    try {
        const user = await User.create({
            username,
            firstName,
            lastName,
            password,
        });
        res.status(200).json({
            msg: "User Created successfully",
            userId: token,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

export default router;
