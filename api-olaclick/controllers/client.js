const mongoose  = require('mongoose');
const Client = require('../models/clients');
const {error, noResults, success, validation} = require('../util/responseApi');


const ValidationInput = {
    isEmailAddress:function(str) {
      const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str);
    },
    isLetterNumber:function (str) {
      const pattern =/^[a-zA-ZÀ-ÿ0-9 ]+$/;
      return pattern.test(str);
    },
    isLetterNumber:function (str) {
      const pattern =/^[a-zA-ZÀ-ÿ0-9 -]+$/;
      return pattern.test(str);
    },

    isLetterSuggest:function (str) {
      const pattern =/[^<>]$/;
      return pattern.test(str);
    },
    isNumber:function(str) {
      const pattern = /^\d+\.?\d*$/;
      return pattern.test(str);
    }
};

module.exports = {
  createClient: async(req, res, next) => {
    try {
      const {name,last_name, email, code_country, whatsapp, age, user_twitter, suggestion} = req.body;
      if(!ValidationInput.isLetterNumber(name)) throw "Escribe solo letras o números  NAME";
      if(!ValidationInput.isLetterNumber(last_name)) throw "Escribe solo letras o números LAST";
      if(!ValidationInput.isEmailAddress(email)) throw "Escribe un correo válido";
      if(!ValidationInput.isLetterNumber(code_country)) throw "Escribe solo letras o números CODE";
      if(!ValidationInput.isLetterNumber(whatsapp)) throw "Escribe solo letras o números WSAH";
      if(!ValidationInput.isLetterNumber(age)) throw "Escribe solo letras o números AGE";
      if(!ValidationInput.isLetterSuggest(user_twitter)) throw "Escribe solo letras o números USER";
      if(!ValidationInput.isLetterSuggest(suggestion)) throw "Escribe solo letras o números sf";
      let client = new Client({
        name, last_name, full_name: name+' '+last_name, email,code_country: `+${code_country}`,whatsapp, age, user_twitter, suggestion
      })
      const dataClient = await client.save();

      res.status(200).json(success(res.statusCode, {message:'Se registro '}));

    } catch (err) {
      console.log("Erro", err)
      return res.status(500).json(error(res.statusCode));
    }
  },
  getAll: async(req, res, next) =>{
    try {
      const data = await Client.find({status: true});
      if (data.length >= 1) {
        return res.status(200).json(success(res.statusCode, data))
      }else{
        return res.status(200).json(noResults(res.statusCode, data))
      }
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err));
    }
  },
  getAllForAdmin: async(req, res, next) =>{
		try {
      const {page, name} = req.query;
      let query = {}
      if(name){
        query.name={ $regex: new RegExp(name), $options: "i" }
      }
      query.status = true
      const data = await Client.paginate(query, optionsPagination(page))
      if (data.data.length >= 1) {
        return res.status(200).json(success(res.statusCode, data))
      }else{
        return res.status(200).json(noResults(res.statusCode, data))
      }
		} catch (err) {
			return res.status(500).json(error(res.statusCode, err))
		}
  },
  getClient: async(req, res) => {
    try {
      const id = req.params.id;
      const data = await Client.findById(id);
      res.status(200).json(success(res.statusCode, data))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
    }
  },
}
