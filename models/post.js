var mongoose = require("mongoose"), 
	Schema = mongoose.Schema; 
	Comment = require('./comment'); 


var PostSchema = new Schema({
	pie: String, 
	kind: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}); 

var Post = mongoose.model("Post", PostSchema); 