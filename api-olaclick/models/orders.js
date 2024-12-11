const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Clients'
  },
  serie: {
    type: String
  },
  descrip: {
    type: String
  },
  date_order: {
    type: String
  },
  total: {
    type: Number
  },
  status_order: {
    type: String,
    enum: ['Iniciado', 'Enviado', 'Entregado'],
    default: 'Iniciado'
  },
  status: {
		type: Boolean,
		default: true
	},
}, {timestamps: true})

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', orderSchema);