const mongoose 	= require('mongoose');
const {textRequired, minCharacters} = require('../util/messageModels');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema 		= mongoose.Schema;

let ProductSchema = new Schema({
  name: {
    type: String,
    required: textRequired('su nombre'),
		min: minCharacters(3),
    unique:true
  },
  category_product: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryProducts'
  },
  stock: {
    type: Number,
    required: textRequired('stock'),
  },
  price_buy:{
    type: Number,
    required: textRequired('precio de compra'),
  },
  price_sale:{
    type: Number,
    required: textRequired('precio de venta'),
  },
  img: {
    type: Array
  },
  qr: {
    type: String
  },
  status: {
		type: Boolean,
		default: true
	}
},{timestamps: true})

ProductSchema.methods.toJson = () => {
  const {_id, ...product} = this.toObject();
  product.uid = _id;
  return product
}

ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(uniqueValidator, {message: '{PATH} es único'})
module.exports = mongoose.model('Products', ProductSchema);