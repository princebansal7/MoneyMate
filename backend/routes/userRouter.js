import express from "express";
import zod from "zod";
import User from "../db.js";

const router = express.Router();

const userInputSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    const isValidResponse = userInputSchema.safeParse({
        username,
        firstName,
        lastName,
        password,
    });
    if (!isValidResponse.success) {
        return res.status(411).json({
            message: "invalid input",
        });
    }
    try {
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(411).json({
                message: "username already exists",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

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
