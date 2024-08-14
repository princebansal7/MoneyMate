import User from "../db.js";

export const userValidation = async (req, res, next) => {
    const { username } = req.body;

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
    next();
};
