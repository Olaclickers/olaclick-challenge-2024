const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema;

let orderDetailSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'order'
  },
  detail: {
    type: Array
  },
  status: {
		type: Boolean,
		default: true
	},
}, {timestamps: true})

orderDetailSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('OrderDetail', orderDetailSchema);