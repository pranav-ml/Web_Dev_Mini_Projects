// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const itemsSchema = {
	name: String
};
const Name = mongoose.model("Name", itemsSchema);

const listSchema = {
	name: String,
	items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);





app.get("/", function(req, res) {

	Name.find({}, function(err, foundItems) {

		res.render('list', {
			listTitle: "Today",
			newListItems: foundItems
		});
		// console.log(foundItems);
	});
});

app.get("/:customListName", function(req, res) {
	const customListName = req.params.customListName;

	List.findOne({
		name: customListName
	}, function(err, foundList) {
		if (!err) {
			if (!foundList) {
				const list = new List({
					name: customListName,
					items: []
				});
				list.save();
				res.redirect("/" + customListName);
			} else {
				res.render("list", {
					listTitle: foundList.name,
					newListItems: foundList.items
				});
			}
		}
	});


});

app.post("/", function(req, res) {
	const itemName = req.body.newItem;
	const listName = req.body.list;
	const item = new Name({
		name: itemName
	});
	if (listName === "Today") {
		item.save();

		res.redirect("/");
	} else {
		List.findOne({
			name: listName
		}, function(err, foundList) {
			foundList.items.push(item);
			foundList.save();
			res.redirect("/" + listName);
		});
	}
});

app.post("/delete", function(req, res) {
	const checkedItemId = req.body.checkbox;
	Name.findByIdAndRemove(checkedItemId, function(err) {
		if (!err) {
			console.log("deleted");
		}
	});
	res.redirect("/");
});
app.listen(3000, function() {
	console.log("Server running at port 3000.");
});