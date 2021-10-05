var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const arr = [];
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var company;
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extend: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("Report");
  dbo.collection("year_data").find({}, { projection: { _id: 0, Name: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);

    for (let i = 1; i < 241; i++) {
      arr[i-1]=result[i-1].Name;
      
    }
    company=arr;

    // res.send(result);
  //  company = result;


    db.close();
  });
});

app.get('/', function (req, res) {
  res.render('index.ejs', { company: company });
});
app.listen(3000, function () {
  console.log("Server is statrd");
});