import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRouter";
import userRouter from "./routes/userRouter";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// use(): for middleware
app.use(cors());
app.use(express.json());

// use(): also for routing the request from endpoint to router
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
