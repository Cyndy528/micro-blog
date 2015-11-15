var mongoose = require ('mongoose'), 
	Schema = mongoose.Schema; 

var PieSchema = new Schema ({
	pie: String, 
	kind: String 
}); 

var Pie = mongoose.model('Pie',PieSchema); 
module.exports = Pie; 