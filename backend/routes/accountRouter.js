import express from "express";
import { authTokenChecker } from "../middlewares/authTokenCheck.js";
import { Account } from "../db.js";

const router = express.Router();

// Handles request for /api/v1/account/*

// Users can get their balance using this
router.get("/balance", authTokenChecker, async (req, res) => {
    const userId = req.userId;
    // console.log(userId);
    try {
        const account = await Account.findOne({ userId });
        res.json({ balance: account.balance });
    } catch (err) {
        res.status(403).json({ msg: "error fetching balance", error: err });
    }
});

export default router;
