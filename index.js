const express = require("express");
const app = express();
const path = require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/public"))); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
 

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/information",async(req,res)=>{
    try{
        const genAI = new GoogleGenerativeAI("AIzaSyAmdFe4YIi-spbYTrCBqADNtYaCaJp7wMA");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(req.body.prompt);
        
        const finalresult = result.response.text();
        
        res.render("result.ejs",{finalresult});
    }catch(err){
        res.send(err);
    }
    
});

app.get("*",(req,res)=>{
     res.send("404 : Page Note Found");
 });

app.listen(8080,()=>{
    console.log("server is listing");
});






