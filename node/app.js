const { request, response } = require("express");
const express=require("express");
const bodyParser=require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var company;
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Report");
  dbo.collection("year_data").find({}, { projection: { _id: 0, Name: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
   // res.send(result);
    company = result[0].Name;
   
    
    db.close();
  });
});

app.get("/",function(request,response){
  //  response.sendFile(__dirname+"/index.html");
  //  response.render(__dirname+"/index.html",{company:company});
  response.render(__dirname + "/index1.html", {company:company});
  response.sendFile(__dirname+"/index1.html");

    
});
/*app.post("/",function(req,res){
  res.render(__dirname + "/index1.html", {company:company});
    res.sendFile(__dirname + "/index1.html");
});
*/
app.listen(3000,function(){
    console.log("Server is statrd");
});


/*

const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var n;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("campus_selection");
  dbo.collection("year_wise_reports").find({}, { projection: { _id: 0, Name: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    n = result[0].Name;
    
    
    db.close();
  });
});

app.get('/main', function(req, res) {
  var name = 'hello';
  res.render(__dirname + "/views/layouts/main.html", {name:name});
});


<script>var name = "<%= name %>";</script>
console.log(name);


app.get('/main', function(req, res) {

  var name = 'hello';

  res.render(__dirname + "/views/layouts/main.html", {name:name});

});


<h1><%= name %></h1>


*/