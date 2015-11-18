// require express and other modules
var express = require('express'), 
	app = express(),
	bodyParser = require('body-parser'), 
	mongoose = require('mongoose'), 
	Comment = require("./models/comment"); 

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

// Set up pies API

//get all pies
  app.get('/api/pies', function (req, res) {
    // find all pies in database
    Pie.find(function (err, allPies) {
      res.json({ pies: allPies });
    });
 }); 


// create new pie
app.post('/api/pies', function(req, res){

	// create a new pie with form data
	var newPies = new Pie (req.body); 

	// save new pie in database
	 newPies.save(function(err, savedPie){
		  res.json(savedPie);
	}); 
}); 

// get a single pie
app.get('/api/pies/:id', function(req, res){

	// get pie id from URL params
	var pieID = req.params.id; 

	// find pie in database by id
	Pie.findOne({ _id: pieId }, function (err, foundPie) {
	      res.json(foundPie);
	  });
});		

//update pie
app.put ('api/pies/:id', function (req, res) {
	//get pie id from url params ('req.params')
	var pieID = req.params.id; 

//find pie to update id
Pie.findOne({ _id: pieId }, function (err, foundPie) {

      // update the pie's attributes
      foundPie.name = req.body.name;
      foundPie.kind = req.body.kind;
      foundPie.location = req.body.location;

      // save updated pie in db
      foundPie.save(function (err, savedPie) {
          res.json(savedPie);
        });
  	});
});

//delete pie
app.delete('api/pies/:id', function(req, res){

	// get pie id from url params ('req.params')
	var pieId= req.params.id; 

	//find pie to delete by its id and remove 
	  Pie.findOneAndRemove({ _id: pieId }, function (err, deletedPie) {
	      res.json(deletedPie);
	  });
	});
//add comments to blog post 
app.post('/api/posts/:postId/comments', function (req, res) {
	
	//set the value fo the post id
	var postId = req.params.postId; 

	//store new comment in mememory 
	var newComments = new Comment(req.body.comments); 
	
	//find post in database by id and add new comment 
	Post.findOne({_id: postId}),function (err, foundPost){
		
		//create new comment
		//add comment to post (update blog post)
		foundPost.comments.push(newComment); 

		//save post
		foundPost.save(function (err, savedPost){
		res.json(newComments); 
		}); 
	}; 
});  


//delete comments from blog post 
app.delete('/api/posts/:postId/comments/:commentId', function(req, res){
	// get blog post and comment ID from url params and save to variable
	var postId = req. params.postId; 
	var commentId = req.params.commentId; 


	//find blog post in database by ID 

	Post.findOne ({_id: postId}, function(err, foundPost){
		var commentIndex = foundPost.comments.indexOf(commentId); 
		//remove comment from post

		foundPost.comment.splice(commentIndex, 1); 
		//save post
		foundPost.save(function (err, savedPost){
			res.json(savedPost); 
		}); 
	}); 
}); 

// listen on port 3000
app.listen( 3000, function(){
	console.log('I am listening'); 
}); 

