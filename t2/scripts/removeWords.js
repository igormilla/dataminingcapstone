var fs = require("fs"),
  _ = require("underscore"),
  jsonfile = require('jsonfile'),
  stopwords = ["review", "work", "fun", "waitress", "tabl", "wait", "minut", "ask", "server",
    "seat", "busi", "told", "seat", "locat", "favorit", "good", "dish", "will", "day", "restaur",
    "time", "order", "best", "great", "area", "didnt", "groupon", "nice", "dont", "year", "male",
    "go", "eaten", "servic", "want", "hour", "happi", "price", "feel", "servic", "eat", "portion",
    "star", "cours", "amaz", "special", "better", "view", "pretti", "drink", "owner", "ive",
    "reserv", "birthday", "window", "delici", "bad", "famili", "staff",
    "atmospher", "visit", "meal", "dinner", "peopl", "waiter", "definit", "night", "cook",
    "menu", "well", "friend", "night", "custom", "pay", "rude", "patio",
    "crowd"
  ];

coisines = JSON.parse(fs.readFileSync("categories.json"));



for (var i = 0; i < coisines.length; i++) {

  var name = "./coisines/" + coisines[i].replace(/\s/g, '') + "_topics.json";
  var current = JSON.parse(fs.readFileSync(name));

  var output = _.without.apply(_, [current].concat(stopwords));

  jsonfile.writeFile(name, output, function(err) {});

}
