var fs = require("fs"),
  _ = require("underscore"),
  jsonfile = require('jsonfile');

var coisines = JSON.parse(fs.readFileSync("./coisines/similarity.json"));
var clusters = [];
for (var i = 0; i < coisines.nodes.length; i++) {
  clusters[i] = [i];
}
// var clusters = [];
// for (var i = 0; i < coisines.nodes.length; i++) {
//   clusters[i] = [];
//   clusters[i].push(i);
//
//   for (var j = 0; j < coisines.nodes.length; j++) {
//     if (i != j) {
//       var links = coisines.links.filter(function(item) {
//         return (item.source === i + 1) && (item.target === j + 1) && (item.value > 0.2);
//       });
//       if (links.length > 0) {
//         for (var n = 0; n < links.length; n++) {
//           var found = false;
//           if (!found) {
//             clusters[i].push(links[n].target);
//           }
//
//         }
//       }
//     }
//   }
// }

function score(i, cuis, log) {
  var s = 0;
  var l = 1;
  for (var q = 0; q < clusters[i].length; q++) {
    var cat = clusters[i][q] + 1;
    if (cat === cuis) {
      continue;
    }
    var links = coisines.links.filter(function(item) {
      return (item.source === cuis) && (item.target === cat) && (item.value > 0) && (item.value !=
        2);
    });

    if (links.length > 0) {
      for (var n = 0; n < links.length; n++) {
        s += links[n].value;
      }
      l += links.length;
    }
  }

  return s /= l;
}
// console.log(clusters);


for (var num = 0; num < 10; num++) {
  for (var i = 0; i < clusters.length; i++) {
    for (var j = 0; j < clusters[i].length; j++) {
      //console.log("clusters[" + i + "] = " + clusters[i]);
      var cat = clusters[i][j];

      var best = i;
      var log = false;
      if (cat === 0) {

        log = true;
      }

      var currScore = score(i, cat + 1, log);

      for (var k = i + 1; k < clusters.length; k++) {

        var tmp = score(k, cat + 1);
        if (currScore < tmp) {
          best = k;
          currScore = tmp;
        }
      }

      for (var t = 0; t < clusters.length; t++) {
        if (t != best) {
          clusters[t] = _.without(clusters[t], cat);
        }
      }
      if (best != i) {
        clusters[best].push(cat);
      }
    }
    // process.exit(1);
  }
  //console.log(clusters);
}

function getClaster(c) {
  var res = "";
  for (var i = 0; i < clusters[c].length; i++) {
    res += coisines.nodes[clusters[c][i]].name + "_" + clusters[c][i] + " ";
  }
  return "[" + res + "]";
}

function getName(i) {
  return coisines.nodes[i].name + "_" + i;
}

// var maxClaster = 3;
//
// function haveClasters() {
//   var c = 0;
//   for (var i = 0; i < clusters.length; i++) {
//     if (clusters[i].length > 1) {
//       c++;
//     }
//   }
//   return c;
// }
//
// while (haveClasters() > maxClaster) {
//   var min = 0;
//   var minL = 100;
//   for (var i = 0; i < clusters.length; i++) {
//     if (clusters[i].length > 0) {
//       if (clusters[i].length < minL) {
//         minL = clusters[i].length;
//         min = i;
//       }
//     }
//   }
//   var c = clusters[min];
//   clusters[min] = [];
//
//   for (var i = 0; i < c.length; i++) {
//     var cat = c[i];
//     var best = 0;
//     var currScore = 0;
//
//     for (var k = 0; k < clusters.length; k++) {
//       var tmp = score(k, cat + 1);
//       if (currScore < tmp) {
//         best = k;
//         currScore = tmp;
//       }
//     }
//
//
//     if (best != i) {
//       clusters[best].push(cat);
//     } else {
//       console.log("FUCK");
//     }
//
//   }
//
// }

var category = 20;
for (var i = 0; i < coisines.nodes.length; i++) {

  var found = false;
  for (var t = 0; t < clusters.length; t++) {
    if (clusters[t].length > 0) {
      if (clusters[t].indexOf(i) > -1) {
        //console.log(getName(i) + " found in " + getClaster(t));
        coisines.nodes[i].group = t;
        found = true;
        break;
      }
    }
  }
  if (!found) {
    coisines.nodes[i].group = category--;
  }
}
console.log(_.sortBy(coisines.nodes, 'group'));
jsonfile.writeFile("./coisines/similarity_cluster.json", coisines, function(err) {});
