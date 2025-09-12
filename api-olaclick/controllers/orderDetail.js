
const OrderDetail = require('../models/orderDetails')
const {error, success, noResults} = require('../util/responseApi');

module.exports = {
  getOrderDetail: async(req, res, next) =>{
    try {
      let {id} = req.params;
      const data = await OrderDetail.where({order: id})
      res.status(200).json(success(res.statusCode, data))
    } catch (e) {
      console.log("ERROR", e)
      return res.status(500).json(error(res.statusCode, e));
    }
  },

}