var mongoose = require ('mongoose'), 
	Schema = mongoose.Schema,
	Comment = require('./comment');

var PieSchema = new Schema ({
	pie: String, 
	kind: String, 
	comments: [{
		type: Schema.Types.ObjectId, 
		ref: "Comment"
	}]
}); 

var Pie = mongoose.model('Pie',PieSchema); 
module.exports = Pie; 

