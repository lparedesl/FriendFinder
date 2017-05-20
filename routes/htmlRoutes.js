var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");

router.get("/",function (req, res){
	res.render("index", {
		headTitle: "Friend Finder | Home",
		title: "Friend Finder"
	});
});

router.get("/survey",function (req, res){
	var questions = JSON.parse(fs.readFileSync("./data/questions.json", "utf8"));
	res.render("survey", {
		headTitle: "Friend Finder | Survey",
		title: "Survey Questions",
		questions: questions
	});
});

module.exports = router;