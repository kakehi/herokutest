var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('cocktaillist', ['cocktaillist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/cocktaillist', function(req, res){
	console.log('I received the get request');

	db.cocktaillist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
	/*
	cocktail1 = {
    	letter: 'c',
    	cocktail: 'cool leatherette',
    	bar: 'sisters'
    };
    cocktail2 = {
    	letter: 'g',
    	cocktail: 'gibson',
    	bar: 'the tradesman'
    };

    var cocktaillist = [cocktail1, cocktail2];

    res.json(cocktaillist);
    */

});

app.post('/cocktaillist', function(req, res){
	console.log(req.body);
	db.cocktaillist.insert(req.body, function(err,doc){
		res.json(doc);
	})
});

app.delete('/cocktaillist/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.cocktaillist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.get('/cocktaillist/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.cocktaillist.findOne({_id:mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.put('/cocktaillist/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.cocktaillist.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set: 
			{
				letter: req.body.letter, 
	        	letter_image: req.body.letter_image, 
	        	thumbnail_class: req.body.thumbnail_class,
	        	thumbnail_odd: req.body.thumbnail_odd,
	        	internal_link: req.body.internal_link,
				style: {
					cocktail_position: req.body.style.cocktail_position,
	        		ingredients_text_color: req.body.style.ingredients_text_color,
	        		triangle1: req.body.style.triangle1,
	        		triangle2: req.body.style.triangle2
				},
				cocktail: {
					name: req.body.cocktail.name,
					silo: req.body.cocktail.silo,
		        	description: req.body.cocktail.description,
		        	howto: req.body.cocktail.howto
		        },
		        bar: {
			       	name: req.body.bar.name,
			       	website: req.body.bar.website,
	        		email: req.body.bar.email,
	        		image: req.body.bar.image,
	        		bulb_image: req.body.bar.bulb_image,
	        		address1: req.body.bar.address1,
	        		address2: req.body.bar.address2,
	        		phone: req.body.bar.phone
				}
			}
		},
		new: true}, function (err, doc){
			res.json(doc);
		});
})

var port = Number(process.env.PORT || 3000);

app.listen(port);