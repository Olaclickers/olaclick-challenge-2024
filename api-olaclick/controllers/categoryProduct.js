const CategoryProduct   = require('../models/categoryProducts');
const {error, success, optionsPagination, noResults} = require('../util/responseApi');

module.exports = {
  createCategoryProduct: async(req, res, next) => {
    try {
      let {name} = req.body;
      let categoryProduct = new CategoryProduct({
        name
      })
      const data = await categoryProduct.save();
      res.status(200).json(success(res.statusCode, {message:'Se registro correctamente'}));
    } catch (e) {
      return res.status(500).json(error(res.statusCode, e));
    }
  },
  getCategoryProduct: async(req, res, next)=>{
    try {
      const id = req.params.id;
      const data = await CategoryProduct.findById(id);
      res.status(200).json(success(res.statusCode, data))
    } catch (e) {
      return res.status(500).json(error(res.statusCode, e));
    }
  },
  getAll: async(req, res, next)=>{
    try {
      const {page, name} = req.query;
      let query = {status: true}
      if(name){
        query.name = {$regex: new RegExp(name), $options: "i"}
      }
      const data = await CategoryProduct.paginate(query, optionsPagination(page))
      if (data.data.length >= 1) {
        return res.status(200).json(success(res.statusCode, data))
      }else{
        return res.status(200).json(noResults(res.statusCode, data))
      }
    } catch (e) {
      return res.status(500).json(error(res.statusCode, e));
    }
  },
}