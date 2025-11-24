import fs from "fs/promises";

let db = "/home/ibrahim/expressToDo/server/data.json"
async function readContent(){
    let userData = await fs.readFile(db,"utf-8")
    return JSON.parse(userData)
}

async function addContent(content){
    await fs.writeFile(db,JSON.stringify(content,null,2))
}
export {readContent,addContent};
