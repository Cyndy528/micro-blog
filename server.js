// require express and other modules
var express = require('express'), 
	app = express(), 
	bodyParser = require('body-parser'); 
	mongoose = require('mongoose'); 

//configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
app.use(express.static(__dirname + '/public'));

//set hbs as server view engine
app.set('view engine', 'hbs'); 

// connect to mongodb
mongoose.connect('mongodb://localhost/pie-app'); 

// require Pie model 
var Pie = require('./models/pie'); 

// HOMEPAGE ROUTE
app.get('/', function(req,res) {
	res.render('index');
});

// API Routes 
// Test data
	var pies = [
		{pie: 'Bosenberry',
		kind: 'Fruit'}, 
		{pie: 'Apple',
		kind: 'Fruit'}, 
		{pie: 'Banana Cream Pie',
		kind: 'Fruit'},
		{pie: 'Chicken Pot Pie',
		kind: 'Savory'},
		{pie: 'Spinach and Cheddar Tart',
		kind: 'Savory'}, 
		{pie: "Shepherd's Pie",
		kind: 'Savory'},
		{pie: 'Minced Meat Pie',
		kind: 'International'},
		{pie: 'Aloo Pie',
		kind: 'International'}, 
		{pie: 'Linzertorte',
		kind: 'International'}
	];

// API Routes
app.get('/api/pies', function (req, res) {
  Pie.find(function (err, allPies) {
    res.json({ pies: allPies });
  });
  Pie.find(function (err, allPies) {
  	res.json ({ pies: allPies}); 
	});
}); 

// set all pies
app.get('/api/pies', function(req, res){
	res.json ( pies ); 
}); 

// get a single beer
app.get('/api/pies/:id', function(req, res){

	// get beer id from URL params
	var pieID = parseInt(req.params.id); 

	// find pie by id
	var foundPie = pies.filter(function(pie){
		return pies._id == pieID; 
	}); 

	//send foundPie as JSON 
	res.json(foundPie); 
}); 
// post a single pie
app.post('api/pies', function(req, res){

	// create a new pie with form data
	var newPies = req.body; 

	//set a sequential id, only checking
	if (pies.length > 0){
		newPies.id = pies[pies.length -1]._id + 1; 
	} else {
		newPies._id = 1; 
	}
	
	//add new pie to 'pies' array
	pies.push(newPies); 

	//send newPie as JSON object
	res.json (newPies); 
}); 

// start server on localhost:3000
app.listen(3000, function() {
  console.log('server started');
});

