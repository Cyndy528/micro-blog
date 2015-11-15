// require express and other modules
var express = require('express'); 
	app = express();
	bodyParser = require('body-parser'); 
	mongoose = require('mongoose'); 

//configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/public")); 

//set hbs as server view engine
app.set('view engine', 'hbs'); 

// connect to mongodb
mongoose.connect('mongodb://localhost/pie-app'); 

// require Pie model 
var Pie = require('./models/pie'); 

// Set up routes
app.get('/', function(req,res) {
	res.render('index');
});

 
// Test data
	// var pies = [
	// 	{pie: 'Bosenberry',
	// 	kind: 'Fruit'}, 
	// 	{pie: 'Apple',
	// 	kind: 'Fruit'}, 
	// 	{pie: 'Banana Cream Pie',
	// 	kind: 'Fruit'},
	// 	{pie: 'Chicken Pot Pie',
	// 	kind: 'Savory'},
	// 	{pie: 'Spinach and Cheddar Tart',
	// 	kind: 'Savory'}, 
	// 	{pie: "Shepherd's Pie",
	// 	kind: 'Savory'},
	// 	{pie: 'Minced Meat Pie',
	// 	kind: 'International'},
	// 	{pie: 'Aloo Pie',
	// 	kind: 'International'}, 
	// 	{pie: 'Linzertorte',
	// 	kind: 'International'}
	// ];

// Set up pies API

//get all pies
app.get('/api/pies', function (req, res) {
  //find all pies in database
  Pie.find(function (err, allPies) {
  	if (err){
  		res.status(500).json({	error: err.message}); 
  	} else {
  		res.json({	pies: allPies}); 
  	}
	});
}); 

// create new pie
app.post('api/pies', function(req, res){

	// create a new pie with form data
	var newPies = new Pie (req.body); 

	// save new pie in database
	new Pie.save(function(err, savedPie){
		if (err) {
			res.status(500).json ({	error: err.message}); 
		} else {
		  res.json(savedPie);
		}
	}); 
}); 

// get a single pie
app.get('/api/pies/:id', function(req, res){

	// get pie id from URL params
	var pieID = req.params.id; 

// find pie in database by id
Pie.findOne({ _id: pieId }, function (err, foundTodo) {
    if (err) {
      if (err.name === "CastError") {
        res.status(404).json({ error: "No ID Match." });
      } else {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.json(foundPie);
    }
  });
});		
	 
//update pie
app.put ('api/pies/:id', function (req, res) {
	//get pie id from url params ('req.params')
	var pieID = req.params.id; 

//find pie to update id
Pie.findOne({ _id: pieId }, function (err, foundPie) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // update the pie's attributes
      foundPie.name = req.body.name;
      foundPie.kind = req.body.kind;

      // save updated todo in db
      foundPie.save(function (err, savedPie) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(savedPie);
        }
      });
    }
  });
});

//delete pie
app.delete('api/pies/:id', function(req, res){

// get pie id from url params ('req.params')
var pieID= req.params.id; 

//find pie to delete by its id
  Pie.findOneAndRemove({ _id: pieId }, function (err, deletedTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedPie);
    }
  });
});

// listen on port 3000
app.listen( 3000, function(){
	console.log('I am listening'); 
}); 

