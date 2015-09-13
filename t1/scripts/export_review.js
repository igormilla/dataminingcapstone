var MJ = require("mongo-fast-join"),
  MongoClient = require('mongodb').MongoClient,
  mongoJoin = new MJ();

MongoClient.connect("mongodb://localhost:27017/yelp", function(err, db) {
  if (!err) {
    mongoJoin
      .query(
        db.collection("business"), {
          categories: 'Veterinarians'
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
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          for (var j = 0; j < item.reviews.length; j++) {
            var review = item.reviews[j].text.replace(/(?:\r\n|\r|\n)/g, '  ');

            if (!RegExp(/(cat|kitten|gato|gata)/g).test(review) && !RegExp(
                /(dog|puppy|perro|perra|dogs)/g).test(review)) {
              console.log(review);
            }
          }
        }
      });
  }
});
