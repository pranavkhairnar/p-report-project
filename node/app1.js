var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const name_of_company = [];
const n_1718 = [];
const n_1819 = [];
const n_1920 = [];
const n_2021 = [];
const s_1718 = [];
const s_1819 = [];
const s_1920 = [];
const s_2021 = [];

var object1;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var company;
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  extend: true
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("Reports");
  dbo.collection("year_data").find({}, {
    projection: {}
  }).toArray(function (err, result) {
    if (err) throw err;
    object1 = result;
    console.log(result[0].Name);

    for (let i = 1; i < 241; i++) {
      name_of_company[i - 1] = result[i - 1].Name;
      n_1718[i - 1] = result[i - 1].N1718;
      n_1819[i - 1] = result[i - 1].N1819;
      n_1920[i - 1] = result[i - 1].N1920;
      n_2021[i - 1] = result[i - 1].N2021;
      s_1718[i - 1] = result[i - 1].Salary1718;
      s_1819[i - 1] = result[i - 1].Salary1819;
      s_1920[i - 1] = result[i - 1].Salary1920;
      s_2021[i - 1] = result[i - 1].Salary2021;
    }



    db.close();
  });
});

app.get('/', function (req, res) {
  res.render('index.ejs', {
    name_of_company: name_of_company,
    n_1718: n_1718,
    s_1718: s_1718,
    n_1819: n_1819,
    s_1819: s_1819,
    n_1920: n_1920,
    s_1920: s_1920,
    n_2021: n_2021,
    s_2021: s_2021,
    object1: object1
  });
});
app.listen(3000, function () {
  console.log("Server is started");
});