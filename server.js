// require express and other modules
var express = require('express'), 
	app = express(), 
	bodyParser = require('body-parser'); 

//configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
app.use(express.static(__dirname + '/public'));

//set hbs as server view engine
app.set('view engine', 'hbs'); 

// HOMEPAGE ROUTE
app.get('/', function(req,res) {
	res.render('index');
});

// API Routes 
// Test data
	var allFruitPies = [
		{fruitPie: 'Bosenberry'}, 
		{fruitPie: 'Apple'}, 
		{fruitPie: 'Banana Cream Pie'}
	];

	//array of test data
	var allSavoryPies = [
		{savoryPie: 'Chicken Pot Pie'},
		{savoryPie: 'Spinach and Cheddar Tart'}, 
		{savoryPie: "Shepherd's Pie"}
	];

	//array of test data
	var allInternationalPies = [
		{internationalPie: 'Chicken Pot Pie'},
		{internationalPie: 'Aloo Pie'}, 
		{internationalPie: 'Linzertorte'}
	];

app.get('/api/FruitPies', function (req, res) {
  FruitPies.find(function (err, allFruitPies) {
    res.json({ FruitPies: allFruitPies });
  });
});


// start server on localhost:3000
app.listen(3000, function() {
  console.log('server started');
});

