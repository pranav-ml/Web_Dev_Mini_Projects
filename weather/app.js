// jshint esversion:6

const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

	const query = capitalizeFirstLetter(req.body.cityName);

	url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=ff80ffa1d7b73b56e12f58349e1c9682&units=metric";

	https.get(url, function(response) {
		response.on("data", function(data) {

			const wdata = JSON.parse(data);
			const temp = wdata.main.temp;
			const dis = wdata.weather[0].description;
			const icon = wdata.weather[0].icon;
			const iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

			res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius.</h1>");
			res.write("<h2>Weather: " + dis + " </h2>");
			res.write("<img src=" + iconurl + ">");
			res.send();
		});

	});
});


app.listen(3000, function() {
	console.log("Server running on port 3000.");
});