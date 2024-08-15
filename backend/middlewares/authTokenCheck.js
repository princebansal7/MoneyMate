import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const authTokenChecker = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.status(411).send("invalid user");
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                msg: "wrong user",
            });
        }
    } catch (err) {
        res.status(403).json({
            msg: "wrong user",
            error: err,
        });
    }
};
