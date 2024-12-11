const Client = require('../models/clients')
const Order = require('../models/orders')
const OrderDetail = require('../models/orderDetails')
const Product = require('../models/products')
const {error, success, noResults} = require('../util/responseApi');

module.exports = {
  createOrder: async(req, res, next) =>{
    try{
      let {client, descrip, date_order, total, order_detail} = req.body;
      const idClient = await Client.findById(client);
      if(!idClient) throw new Error("No existe el usuario")
      const countOrders = await Order.countDocuments({status: true})
      const order = new Order({
        client, serie: "0-0"+(countOrders + 1) ,descrip, date_order, total
      })
      const dataOrder = await order.save();
      idOrder = dataOrder._id.toHexString();
      const orderDetail = new OrderDetail({
        order: idOrder,
        detail: order_detail
      })
      order_detail.forEach(element => {
        updateStock(element.id, element.cant)
      });

      async function updateStock(id,cant) {
        const dataProduct = await Product.findById(id)
        dataProduct.stock = dataProduct.stock - cant
        dataProduct.save()
      }
      const dataOrderDetail = orderDetail.save();
      res.status(200).json(success(res.statusCode, {message:'Se registro la orden'}));
    } catch (e) {
      return res.status(500).json(error(res.statusCode, e));
    }
  },
  getOrder: async(req, res, next) =>{
    try {
      let {serie} = req.params;
      const data = await Order.where({serie: serie});

      res.status(200).json(success(res.statusCode, data))
    } catch (e) {
      console.log("ERROR", e)
      return res.status(500).json(error(res.statusCode, e));
    }
  },
  getAll: async(req, res, next)=>{
    try {
      const {page, name, limit} = req.query;
      let query = {status: true}
      if(name){
        query.name = {$regex: new RegExp(name), $options: "i"}
      }
      const options =  {
        sort: { name: -1 },
        populate: [{path: "client", strictPopulate:false}],
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        customLabels: {
          docs: 'data',
          totalDocs: 'total'
        }
      }
      const data = await Order.paginate(query, options)
      if (data.data.length >= 1) {
        return res.status(200).json(success(res.statusCode, data))
      }else{
        return res.status(200).json(noResults(res.statusCode, data))
      }
    } catch (e) {
      console.log("ERROR GET PRODUCTS", e)
      return res.status(500).json(error(res.statusCode, e));
    }
  },
  update: async(req, res) => {
    try {
      let {id} = req.params;
      let {client, descrip, date_order, total, order_detail, status_order} = req.body;
      let dataUpdate = {
         client, descrip, date_order, total, order_detail, status_order
      }
      const data = await Order.findByIdAndUpdate(id, dataUpdate,  {new: true})
      res.status(200).json(success(res.statusCode, {data, message: 'Order Actualizada'} ))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
    }
  },
}