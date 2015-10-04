var fs = require('fs'),
  _ = require("underscore"),
  dishes = JSON.parse(fs.readFileSync("scores.json")),
  results = [];

var param = "restaurants_length";

dishes.sort(function(a, b) {
  return parseFloat(b[param]) - parseFloat(a[param]);
});

var res = [];
for (var d = 0; d < 20; d++) {
  res.push({
    name: dishes[d].name,
    value: dishes[d][param]
  })
}

console.log(res);
