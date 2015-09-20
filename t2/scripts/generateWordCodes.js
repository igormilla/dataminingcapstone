var fs = require("fs"),
  _ = require("underscore"),
  jsonfile = require('jsonfile');

coisines = JSON.parse(fs.readFileSync("categories.json"));
topics = [];
var allTopics = [];

for (var i = 0; i < coisines.length; i++) {
  var cTopics = JSON.parse(fs.readFileSync("./coisines/" + coisines[i].replace(/\s/g, '') + "_topics.json"));
  topics.push(cTopics);
  allTopics = _.union(allTopics, cTopics);
}

for (var i = 0; i < coisines.length; i++) {
  for (var j = 0; j < topics[i].length; j++) {
    topics[i][j] = allTopics.indexOf(topics[i][j]);
  }
  var file = "./coisines/" + coisines[i].replace(/\s/g, '') + "_topics_id.json";

  jsonfile.writeFile(file, topics[i], function(err) { });

}
