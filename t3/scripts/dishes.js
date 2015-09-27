var fs = require('fs');

fs.readFile('./Mediterranean.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }


  var sentences = data.split(".");

  console.log(sentences.length);

  fs.closeSync(fs.openSync("./out.txt", 'w'));

  var stream = fs.createWriteStream("./out.txt", {
    flags: 'a'
  });
  stream.once('open', function(fd) {
    stream.write("Mediterranean\n");
    for (var i = 0; i < sentences.length; i++) {
      var myregexp = /ordered the(.*)/;
      var match = myregexp.exec(sentences[i]);

      if (match !== null) {
        var candidate = match[1].trim();

        if (candidate.split(" ").length > 2) {
          if (candidate.indexOf(",")) {
            var newCandidate = candidate.split(",");
            if (newCandidate.length > 2) {

              write(newCandidate[0]);
            }
          } else {
            if (candidate.indexOf("and")) {
              var cnd = candidate.split("and");
              if (cnd.length > 2) {
                write(cnd[0]);
              }
            }
          }
        } else {
          write(candidate)
        }
      }

    }
    stream.end();
  });

  function write(candidate) {
    candidate = clean(candidate);
    candidate = candidate.replace("/\"/g", "");
    if (candidate.length > 5) {
      stream.write(candidate + "\n");
    }
  }

  function clean(str) {
    str = str.replace("/\"/g", "");
    var stops = [" which ", " that ", " with ", "-", "(", ")", " and ", "&", ";", "!", " for",
      " as",
      " s "
    ];

    for (var i = 0; i < stops.length; i++) {
      str = str.split(stops[i])[0].trim();
    }
    var myregexp = /(.*) s$/;
    var match = myregexp.exec(str);

    if (match !== null) {
      str = match[0];
    }
    str = str.replace("/[\"|\(|\)\|plate|]/g", "");

    return str;
  }

});
