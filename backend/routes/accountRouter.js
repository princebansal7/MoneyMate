import express from "express";
import { authTokenChecker } from "../middlewares/authTokenCheck.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

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

// Transaction router [Important]

router.post("/transaction", authTokenChecker, async (req, res) => {
    // Bad Solution:
    //  - Issues: No Atomicity
    //            No lock, i.e, no prevention of multiple request during the transaction
    const { sendToUserId, amount } = req.body;
    const userId = req.userId;
    console.log(userId);

    const account = await Account.findOne({ userId });
    if (account.balance < amount) {
        return res.status(400).json({
            msg: "insufficient balance",
        });
    }

    const toAccount = await Account.findOne({ userId: sendToUserId });
    console.log(sendToUserId);
    if (!toAccount) {
        return res.json({
            msg: "user doesn't exist whom you want to send the amount",
        });
    }

    // Updating balance:
    // - reducing amount from user account who is sending
    await Account.updateOne(
        { userId: userId },
        { $inc: { balance: -amount.toFixed(2) } }
    );
    // - increasing amount of user to whom amount is sent
    await Account.updateOne(
        { userId: sendToUserId },
        { $inc: { balance: amount.toFixed(2) } }
    );

    res.json({
        msg: "Transaction Successful",
    });
});

export default router;
