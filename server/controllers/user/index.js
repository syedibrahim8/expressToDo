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
        let len = existData[existData.length-1].id;
        existData.push({id : ++len})
        existData[existData.length-1].fname = req.query.fname;
        existData[existData.length-1].age = Number(req.query.age)
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
        console.log(error);
        res.status(500).json({msg:error})
    }
})
router.delete("/delete/:id",async(req,res)=>{
    try {
        let userId = req.params.id
        let existData = await readContent();
        let newData = existData.filter((x)=>x.id != userId);
        await addContent(newData);
        res.status(200).json({msg:"Id deleted"})
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:error})
    }
})

export default router;