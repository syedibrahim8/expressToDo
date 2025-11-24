import express from "express";
import {readContent,addContent} from "../../utils/helper.js";
const router = express.Router();

router.get("/fetch",async (req,res)=>{
    try {
        let receiveData = await readContent();
        console.log(receiveData)
        res.status(200).json(receiveData)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})
router.post("/register",async (req,res)=>{
    try {
        let existData = await readContent();
        let userInput = req.body;
        existData.push(userInput)
        await addContent(existData)
        res.status(200).json({msg:"user added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router;