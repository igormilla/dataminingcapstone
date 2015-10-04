var express = require("express");
var app = express();
var path = require("path");


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/recomender.html'));
});

app.get('/test.json', function(req, res) {
  res.sendFile(path.join(__dirname + '/test.json'));
});

app.listen(3000);

console.log("Running at Port 3000");
