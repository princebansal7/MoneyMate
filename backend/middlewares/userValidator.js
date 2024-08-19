import { User } from "../db.js";

export const userSignupValidation = async (req, res, next) => {
    const { username } = req.body;

    try {
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(409).json({
                message: "username already exists",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    next();
};

export const userSigninValidation = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const userExist = await User.findOne({ username, password });
        if (!userExist) {
            return res.status(411).json({
                message: "user doesn't exists",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    next();
};
