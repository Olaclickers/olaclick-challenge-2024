const mongoose 	= require('mongoose');
const {textRequired, minCharacters} = require('../util/messageModels');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema 		= mongoose.Schema;


let clientSchema = new Schema({
	name: {
		type: String,
		required: textRequired('su nombre'),
		min: minCharacters(3)
	},
  last_name: {
		type: String,
		required: textRequired('sus apellidos'),
		min: minCharacters(3)
	},
  full_name:{
    type: String
  },
  phone: {
    type: String,
    required: textRequired('el teléfono'),
    unique: true
  },
	status: {
		type: Boolean,
		default: true
	},
},{timestamps: true});
clientSchema.plugin(mongoosePaginate);
clientSchema.plugin(uniqueValidator, {message: '{PATH} es único'})
module.exports = mongoose.model('Clients', clientSchema);