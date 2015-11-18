var mongoose = require('mongoose'), 
	Schema = mongoose.Schema, 
	passportLocalMongoose = require('passport-local-mongoose'); 

//defining the UserSchema and assigned attributes
var UserSchema = new Schema ({
	username: String, 
	password: String, 
}); 

//takes care of hashing and salting the user's plain-test password when they sign up
//Compares the password the user enters at login to their hashed and salted password stored in the db
UserSchema.plugin(passportLocalMongoose); 

//create User model and export it
var User = mongoose.model('User, UserSchema'); 
module.exports = User; 











