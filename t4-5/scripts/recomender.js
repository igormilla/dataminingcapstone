var fs = require('fs'),
  _ = require("underscore"),
  dishes = JSON.parse(fs.readFileSync("betterScores.json"));

var dish = "kebab";

var bus = _.find(dishes, function(obj) {
  return obj.name = dish;
});
bus.restaurants.sort(function(a, b) {
  return parseFloat(b.score) - parseFloat(a.score);
})

var best = bus.restaurants.slice(0, 9);

console.log(JSON.stringify(best));
