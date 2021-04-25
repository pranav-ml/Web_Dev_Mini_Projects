// jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.post("/", function(req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.emailAddress;

	var data = {
		members: [{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
			}
		}]
	};

	var jsondata = JSON.stringify(data);

	const url = "https://us7.api.mailchimp.com/3.0/lists/7347a8ce79";
	const options = {
		method: "POST",
		auth: "pranav:3ebd71ac82685b6d04f3a6d2f528e395-us7"
	};

	const request = https.request(url, options, function(response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure1.html");
		}
		response.on("data", function(data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsondata);
	request.end();
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/fail", function(req, res) {
	res.redirect("/");
});

app.listen(3000, function() {
	console.log("Server running at port 3000.");
});

// api key 3ebd71ac82685b6d04f3a6d2f528e395-us7
// list id 7347a8ce79