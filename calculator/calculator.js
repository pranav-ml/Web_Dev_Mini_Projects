// jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	var num1 = Number(req.body.num1);
	var num2 = Number(req.body.num2);
	// console.log(req.body);
	var ans = num1 + num2;
	res.send("The ans is " + ans);

});

app.listen(3000, function() {
	console.log("Server started at port 3000");
});