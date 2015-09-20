var fs = require("fs"),
  _ = require("underscore"),
  jsonfile = require('jsonfile'),
  similarity = require('compute-cosine-similarity');

coisines = JSON.parse(fs.readFileSync("categories.json"));
topics = [];
var allTopics = [];

var output = {
  nodes: [],
  links: []
};


for (var i = 0; i < coisines.length; i++) {
  output.nodes.push({
    name: coisines[i],
    group: 1
  });

  var current = JSON.parse(fs.readFileSync("./coisines/" + coisines[i].replace(/\s/g, '') +
    "_topics_id.json"));

  for (var t = 0; t < coisines.length; t++) {
    var topic = JSON.parse(fs.readFileSync("./coisines/" + coisines[t].replace(/\s/g, '') +
      "_topics_id.json"));

    output.links.push({
      source: (i + 1),
      target: (t + 1),
      value: similarity(current, topic)
    });

  }

}

jsonfile.writeFile("./coisines/similarity.json", output, function(err) {});
