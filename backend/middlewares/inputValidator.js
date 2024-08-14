import zod from "zod";

const userInputSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
});

export const inputValidation = (req, res, next) => {
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
    next();
};
