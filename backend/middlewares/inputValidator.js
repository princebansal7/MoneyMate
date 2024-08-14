import zod from "zod";

const userSignupInputSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
});

export const signupInputValidation = (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    const isValidResponse = userSignupInputSchema.safeParse({
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
    next();
};

const userSigninInputSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6),
});

export const signinInputValidation = (req, res, next) => {
    const { username, password } = req.body;
    const isValidResponse = userSigninInputSchema.safeParse({
        username,
        password,
    });
    if (!isValidResponse.success) {
        return res.status(411).json({
            message: "invalid input",
        });
    }
    next();
};