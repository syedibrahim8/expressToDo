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
        let len = existData.length;
        let userInput = req.body;
        userInput.id = len + 1
        existData.push(userInput)
        await addContent(existData)
        res.status(200).json({msg:"user added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})
router.put("/update/:id",async(req,res)=>{
    try {
        let existData = await readContent();
        let id = req.params.id;
        if(id <= 0 || id > existData.length){
            return res.status(401).json({msg:"Invalid id"})
        }
        existData[id-1].fname = req.body.fname || existData[id-1].fname;
        existData[id-1].age = req.body.age || existData[id-1].age;
        await addContent(existData);
        res.status(200).json({msg:"Account updated"})       
    } catch (error) {
        
    }
})

export default router;