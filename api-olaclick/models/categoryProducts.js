const mongoose 	= require('mongoose');
const {textRequired, minCharacters} = require('../util/messageModels');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema 		= mongoose.Schema;

let categoryProductSchema = new Schema({
  name:{
    type: String
  },
  status: {
		type: Boolean,
		default: true
	}
},{timestamps: true})
categoryProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CategoryProducts', categoryProductSchema)