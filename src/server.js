const express = require("express");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.static("."));
 
const upload = multer({
    storage:multer.memoryStorage()
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dashboard.html");
});

app.post("/", upload.single("file"), async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const file = req.file;

        let fileContent = "";

        if(file){
            fileContent = file.buffer.toString("utf-8");
        }

        if (!prompt && !file){
            return res.status(400).json({
                error :"prompt kosong dan file kosong"
            })
        }

        const joinData = `${prompt}${fileContent}`;

        const response = await fetch("http://127.0.0.1:11434/api/generate",{
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                model : "qwen2.5-coder:3b",
                prompt : joinData,
                stream : false
            })
        })

        if (!response.ok){
            throw new Error(
                `http error : ${response.status}`
            );
        }  
        
        const data = await response.json();

        res.json({
            response : data.response
        });
    }catch (error){
        console.error(error);

        return res.status(500).json({
            error:"internal server"
        })
    }
});

app.listen(3000, "127.0.0.1",() => {
    console.log("run");
    console.log("http://127.0.0.1:3000/")
});