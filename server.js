// require express and other modules
var express = require('express'), 
	app = express(), 
	bodyParser = require('body-parser'); 

// HOMEPAGE ROUTE

app.get('/', function(req,res) {
	res.send('hello world');
});

// start server on localhost:3000
app.listen(3000, function() {
	console.log('server stared'); 

}); 