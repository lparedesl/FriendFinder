var express = require("express");
var router = express.Router();
var fs = require("fs");

var people = JSON.parse(fs.readFileSync("./data/people.json", "utf8"));

router.get("/friends", function(req, res) {
    return res.json(people);
});

router.post("/friends", function(req, res) {
  var score;
  var totalDiff = 0;
  var newPersonScores = [];
  var differences = [];
  var lowest = 100;
  var index;
  var newPerson = req.body;

  for (var i = 0; i < newPerson.scores.length; i++) {
    score = parseInt(newPerson.scores[i]);
    newPersonScores.push(score);
  }

  for (var i = 0; i < people.length; i++) {
    for (var j = 0; j < people[i].scores.length; j++) {
      score = parseInt(people[i].scores[j]);
      var diff = Math.abs(newPersonScores[j] - score);
      totalDiff += diff;
    }
    differences.push(totalDiff);
    if (differences[i] < lowest) {
      lowest = differences[i];
      index = i;
    }
    totalDiff = 0;
  }

  people.push(newPerson);
  fs.writeFileSync("./data/people.json", JSON.stringify(people, null, 2), "utf8");
  res.json(people[index]);
});

module.exports = router;