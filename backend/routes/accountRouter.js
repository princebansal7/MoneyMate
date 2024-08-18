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

/*

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

*/

// Good way to Handle this is using Transactions:

router.post("/transaction", authTokenChecker, async (req, res) => {
    const currSession = await mongoose.startSession();
    try {
        currSession.startTransaction();

        const { sendToUserId, amount } = req.body;
        const userId = req.userId;

        // console.log(userId);

        // Fetch the account userId within the transaction
        const account = await Account.findOne({ userId }).session(currSession);
        if (!account || account.balance < amount) {
            await currSession.abortTransaction();
            return res.status(400).json({
                msg: "insufficient balance or wrong account",
            });
        }

        // Fetch the account userId within the transaction
        const toAccount = await Account.findOne({
            userId: sendToUserId,
        }).session(currSession);

        // console.log(sendToUserId);

        if (!toAccount) {
            await currSession.abortTransaction();
            return res.json({
                msg: "user doesn't exist whom you want to send the amount",
            });
        }

        // Performing Transaction

        // - deducting amount of user to who sent the amount
        await Account.updateOne(
            { userId: userId },
            { $inc: { balance: -amount.toFixed(2) } }
        ).session(currSession);

        // - increasing amount of user to whom amount is sent
        await Account.updateOne(
            { userId: sendToUserId },
            { $inc: { balance: amount.toFixed(2) } }
        ).session(currSession);

        // Commit the transaction
        await currSession.commitTransaction();

        res.json({
            msg: "Transaction Successful",
        });
    } catch (err) {
        await currSession.abortTransaction();
        res.json({
            msg: "Transaction failure, Amount will be rollback",
            Error: err,
        });
    } finally {
        currSession.endSession();
    }
});

export default router;
