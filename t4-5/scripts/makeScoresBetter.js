var fs = require('fs'),
  MongoClient = require('mongodb').MongoClient,
  dishes = JSON.parse(fs.readFileSync("scores.json")),
  restaurants = {};

MongoClient.connect("mongodb://localhost:27017/yelp", function(err, db) {
  if (!err) {

    db.collection("business").find().toArray(function(err, docs) {
      if (!err) {
        for (var d = 0; d < docs.length; d++) {
          restaurants[docs[d].business_id] = docs[d].name;
        }
      } else {
        console.log(err);
      }
      db.close();

      for (d = 0; d < dishes.length; d++) {
        for (var b = 0; b < dishes[d].restaurants.length; b++) {
          dishes[d].restaurants[b].name = restaurants[dishes[d].restaurants[b].id];
        }
      }
      console.log(JSON.stringify(dishes));
    });

  }
});
