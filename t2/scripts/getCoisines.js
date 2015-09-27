var MJ = require("mongo-fast-join"),
  MongoClient = require('mongodb').MongoClient,
  mongoJoin = new MJ(),
  fs = require("fs");
coisines = JSON.parse(fs.readFileSync("categories_t3.json"));


function process(err, items, coisine, callback) {
  console.log("p " + coisine);
  var fileName = coisine.replace(/\s/g, '') + ".txt";
  fs.closeSync(fs.openSync("./coisines/" + fileName, 'w'));

  var stream = fs.createWriteStream("./coisines/" + fileName, {
    flags: 'a'
  });
  stream.once('open', function(fd) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.reviews !== undefined && item.reviews !== null && item.reviews.length > 0) {
        for (var j = 0; j < item.reviews.length; j++) {
          var review = item.reviews[j].text.replace(/(?:\r\n|\r|\n)/g, ' ');
          review = review + "\r\n";
          stream.write(review);
        }
      }
    }
    stream.end();
    callback();
  });
}

function q(db, i) {
  console.log("q " + coisines[i]);
  mongoJoin
    .query(
      db.collection("business"), {
        categories: coisines[i]
      }, {
        business_id: 1,
        _id: 0
      }
    )
    .join({
      joinCollection: db.collection("review"),
      leftKeys: ["business_id"],
      rightKeys: ["business_id"],
      newKey: "reviews"
    })
    .exec(function(err, items) {
      process(err, items, coisines[i], function() {
        if (++i < coisines.length) {
          q(db, i);
        }
      });
    });
}

MongoClient.connect("mongodb://localhost:27017/yelp", function(err, db) {
  if (!err) {
    console.log("coisines.length=" + coisines.length);
    q(db, 0);
  }
});
