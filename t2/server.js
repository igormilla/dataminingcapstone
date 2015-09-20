var express = require("express");
var app = express();
var path = require("path");


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/coisines.html'));
});

app.get('/flare.json', function(req, res) {
  res.sendFile(path.join(__dirname + '/coisines/similarity_cluster.json'));
});

app.listen(3000);

console.log("Running at Port 3000");
