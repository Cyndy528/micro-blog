// require express and other modules
var express = require('express'); 
	app = express();
	bodyParser = require('body-parser'); 
	hbs = require ('hbs'); 
	mongoose = require('mongoose'); 

//configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
// app.use(express.static(__dirname + '/public'));
app.use(express.static("public")); 

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

// Set up pies api
app.get('/api/pies', function (req, res) {
  //find all pies in database
  Pie.find(function (err, allPies) {
  	res.json ({ pies: allPies}); 
	});
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
	var newPies = new Pie (req.body); 

	// save new pie in database
	new Pie.save(function(err, savedPie){
		res.json(savedPie);
	});


//update pie
app.put ('api/pies/:id', function (req, res) {
	//get pie id from url params ('req.params')
	var pieID = parseInt(req.params.id); 

	//find pie to update it's id
	var pieToUpDate = pies.filter(function(pie){ 
		return pie._id === pieId; 
	}) [0]; 
	//update the pie's name
	pieToUpDate.name = req.body.task;
	
	//update the pie kind
	pieToUpDate.kind = req.body.kind;
	
	//send back updated pie
	res.json(pieToUpDate); 
});


//delete pie
app.delete('api/pies/:id', function(req, res){

	// get pie id from url params ('req.params')
	var pieID= parseInt(req.params.id); 

	//find pie to delete by its id
	var pieToDelete = pie.filter(function(pie) {
		return pie._id === pieId; 
	}) [0]; 

	//find index of pie in 'pie' array
	var pieIndex = pie.indexOf(pieToDelete); 

	//remove pie from 'pie' array
	pie.splice(pieIndex, 1); 

	//send back deleted todo
	res.json(pieToDelete); 
	
}); 

// listen on port 3000
var server=app.listen(process.env.PORT || 3000, function(){
	console.log('I am listening'); 
}); 

