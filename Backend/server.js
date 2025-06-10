const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors = require('cors');
const {GoogleGenerativeAI}=require('@google/generative-ai')
require('dotenv').config()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'));

const genAI=new GoogleGenerativeAI(process.env.API_KEY)
const model=genAI.getGenerativeModel({model:'gemini-1.5-flash'})

const generate=async(prompt)=>{
    try{
        const res=await model.generateContent(prompt)
        return res.response.text();
    }
    catch(err){
        console.log(err)
    }
}

app.post("/api/content",async (req,res)=>{
    try{
        const data=req.body.question
        const result=await generate(data)
        res.status(200).json({"result":result})
    }
    catch(err){
        res.status(500).json({err:"Internal server error"})
    }
})

app.listen(3000,()=>{
    console.log("App is listening on port 3000")
})

