import express from "express";
import dotenv from "dotenv";
import userRouter from "./controllers/user/index.js"
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json())

app.use("/user",userRouter);

app.listen(port,()=>{
    console.log(`Server is high on caffein at http://localhost:${port}`);
})
