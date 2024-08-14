import express from "express";
import User from "../db.js";
import { inputValidation } from "../middlewares/inputValidator.js";
import { userValidation } from "../middlewares/userValidator.js";

const router = express.Router();

router.post("/signup", inputValidation, userValidation, async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    try {
        const user = await User.create({
            username,
            firstName,
            lastName,
            password,
        });
        res.status(201).json({
            msg: "User Created successfully",
            userId: user._id,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

export default router;
