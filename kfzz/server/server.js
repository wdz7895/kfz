const express = require("express")
const adminrouter = require("./router/admin_router")
const bodyParser = require("body-parser")
const http = express();
http.listen(3000,()=>{
    console.log("server port 3000")
})

http.use(bodyParser.urlencoded({extended:false}));

http.use("/admin",adminrouter)






http.all("*",(req,res)=>{
    res.sendFile(__dirname+req.url)
})