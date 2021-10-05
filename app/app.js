const { response } = require("express");
const express=require("express");
const app=express();
app.get("/",function(request ,response){
   // console.log(request);
   response.send("hello");
})
app.get("/contact",function(req,res){
    res.send("contact");
})
app.get("/about",function(req,res){
    res.send("My name is Abhinav Kudnar");
})
app.get("/Hobbies",function(req,res){
    res.send("Coding");
})
app.listen(3000 ,function(){
    console.log("server started on port 3000");
});
