var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var expressHbs = require('express-handlebars');

var PORT = process.env.PORT || "3000";
var html = require("./routes/htmlRoutes");
var api = require("./routes/apiRoutes");

var app = express();

app.engine(".hbs", expressHbs({
	defaultLayout: "layout",
	extname: ".hbs"
}));
app.set("view engine", ".hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);
app.use("/", html);

app.use(function(req, res, next) {
	var error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use(function(error, req, res, next) {
	res.locals.message = error.message;
	res.locals.error = req.app.get("env") === "development" ? error : {};
	res.status(error.status || 500);
	res.render("error");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});