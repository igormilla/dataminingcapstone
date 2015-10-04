var fs = require('fs'),
  MongoClient = require('mongodb').MongoClient,
  sentiment = require('sentiment'),
  _ = require("underscore"),
  dishes = JSON.parse(fs.readFileSync("dishes.json")),
  results = [];

function processor(db, d) {
  var review = db.collection("review"),
    dish = dishes[d];
  review.find({
    $text: {
      $search: "\"" + dish + "\""
    }
  }).toArray(function(err, docs) {
    var cDish = {
        name: dishes[d],
        reviews: docs.length
      },
      restaurants = [],
      restaurants_ids = [],
      score = 0;

    for (var r = 0; r < docs.length; r++) {
      var currScore = sentiment(docs[r].text).score,
        rId = restaurants_ids.indexOf(docs[r].business_id);
      score += currScore;

      if (rId === -1) {
        restaurants.push({
          id: docs[r].business_id,
          score: currScore
        });
        restaurants_ids.push(docs[r].business_id);
      } else {
        restaurants[rId].score = (restaurants[rId].score + currScore) / 2;
      }

    }
    cDish.score = score / docs.length;
    cDish.restaurants = restaurants;
    cDish.restaurants_length = restaurants_ids.length;

    results.push(cDish);

    if (++d < dishes.length) {
      processor(db, d);
    } else {
      console.log(JSON.stringify(results));
      db.close();
    }

  });


}

MongoClient.connect("mongodb://localhost:27017/yelp", function(err, db) {
  if (!err) {
    processor(db, 0);
  }
});
