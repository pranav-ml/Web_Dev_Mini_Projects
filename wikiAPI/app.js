// jshint esversion:6

// import libraries
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

// initilaize libraries
mongoose.connect('mongodb://localhost:27017/wikiDB',
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded(
{
	extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res)
{
	res.send("up and running");
});

// main

const articleSchema = {
	title: String,
	content: String
};
const Article = mongoose.model("Article", articleSchema);
app.route("/articles")

	.post(function(req, res)
	{

		const article = new Article(
		{
			title: req.body.title,
			content: req.body.content
		});
		article.save(function(err)
		{
			if (!err)
			{
				res.send("saved");
			}
			else
			{
				res.send(err);
			}
		});
	})

	.get(function(req, res)
	{
		Article.find(function(err, foundArticles)
		{
			if (!err)
			{
				res.send(foundArticles);
			}
			else
			{
				res.send(err);
			}
		});
	})
	.delete(function(req, res)
	{
		Article.deleteMany(function(err)
		{
			if (!err)
			{
				res.send("deleted succesfully");
			}
			else
			{
				res.send(err);
			}
		});
	});

app.route("/articles/:articleTitle")
	.get(function(req, res)
	{

		Article.findOne(
		{
			title: req.params.articleTitle
		}, function(err, foundArticle)
		{
			if (foundArticle)
			{
				res.send(foundArticle);
			}
			else
			{
				res.send("404 page not found");
			}
		});
	})
	.put(function(req, res)
	{
		Article.update(
			{
				title: req.params.articleTitle
			},
			{
				title: req.body.title,
				content: req.body.content
			},
			{
				overwrite: true
			},
			function(err)
			{
				if (!err)
				{
					res.send("succesfully updated article");
				}
				else
				{
					res.send(err);
				}
			});
	})
	.patch(function(req, res)
	{
		Article.updateOne(
			{
				title: req.params.articleTitle
			},
			{
				$set: req.body
			},
			function(err)
			{
				console.log(req.body);
				if (!err)
				{
					res.send("succesfully updated article");
				}
				else
				{
					res.send(err);
				}
			});
	})
	.delete(function(req, res)
	{
		Article.deleteOne(
		{
			title: req.params.articleTitle
		}, function(err)
		{
			if (!err)
			{
				res.send("succesfully deleted");
			}
			else
			{
				res.send(err);
			}
		});
	});





// run server
app.listen(3000, function()
{
	console.log("Server running at port 3000");
});