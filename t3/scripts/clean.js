var fs = require('fs'),
  _ = require("underscore");

fs.readFile('./out0.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  data = data.toLowerCase();
  var dishes = data.split("\n");
  dishes = _.uniq(dishes).sort();

  fs.closeSync(fs.openSync("./results.txt", 'w'));

  var stream = fs.createWriteStream("./results.txt", {
    flags: 'a'
  });
  stream.once('open', function(fd) {
    stream.write("Mediterranean\n");
    for (var i = 0; i < dishes.length; i++) {
      stream.write(dishes[i] + "\n");
    }
    stream.end();
  });

});
