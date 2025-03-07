const Product   = require('../models/products');
const QRCode = require('qrcode')
const {error, success, optionsPagination, noResults} = require('../util/responseApi');

module.exports = {
  createProduct: async(req, res, next) => {
    try {
      let {name, category_product, stock, price_buy, price_sale, img} = req.body;

      const codeQR = await QRCode.toDataURL(name,{version: 2})
      if(codeQR){
        let product = new Product({
          name, category_product, stock, price_buy, price_sale, img, qr: codeQR
        })
        const data = await product.save();
        res.status(200).json(success(res.statusCode, {message:'Se registro correctamente'}));
      }

    } catch (e) {
      return res.status(500).json(error(res.statusCode, e));
    }
  },
  getProduct: async(req, res, next)=>{
    try {
      let {name} = req.params;
      name = name.replace(/\-+/g, ' ')
      const data = await Product.where({name: name});
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
        populate: [{path: "category_product", strictPopulate:false}],
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        customLabels: {
          docs: 'data',
          totalDocs: 'total'
        }
      }
      const data = await Product.paginate(query, options)
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
      let {name, category_product, stock, price_buy, price_sale,img} = req.body;
      let dataUpdate = {
         name, category_product, stock, price_buy, price_sale, img
      }
      const data = await Product.findByIdAndUpdate(id, dataUpdate,  {new: true})
      res.status(200).json(success(res.statusCode, {data, message: 'Producto Actualizada'} ))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
    }
  },
  delete: async(req, res) =>{
    try {
      let {id} = req.params
      const dataProduct = await Product.findById(id)
      dataProduct.status = false
      dataProduct.save((err, data)=> {
        res.status(200).json(success(res.statusCode,{data, message: 'Producto Eliminada'} ))
      })
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
    }
  }
}