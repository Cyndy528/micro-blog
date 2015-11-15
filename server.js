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
	// var pies = [
	// 	{fruitPie: 'Bosenberry'}, 
	// 	{fruitPie: 'Apple'}, 
	// 	{fruitPie: 'Banana Cream Pie'},
	// 	{savoryPie: 'Chicken Pot Pie'},
	// 	{savoryPie: 'Spinach and Cheddar Tart'}, 
	// 	{savoryPie: "Shepherd's Pie"},
	// 	{internationalPie: 'Chicken Pot Pie'},
	// 	{internationalPie: 'Aloo Pie'}, 
	// 	{internationalPie: 'Linzertorte'}
	// ];

app.get('/api/pies', function (req, res) {
  Pie.find(function (err, allPies) {
    res.json({ pies: allPies });
  });
});


// start server on localhost:3000
app.listen(3000, function() {
  console.log('server started');
});

