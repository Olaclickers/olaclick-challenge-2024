const User   = require('../models/users');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { error, success, validation} = require('../util/responseApi');

module.exports = {
  authUser: async(req, res) => {
    try{
      let { email, password} = req.body;
      const data = await User.findOne({email: email})
      let token = jwt.sign({data: data}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

      if(!data) return res.status(400).json({success: false, message: '(Usuario) o contraseña incorrectos'})
      if(!bcrypt.compareSync(password, data.password)) return res.status(400).json({success: false, message: 'Usuario o (contraseña) incorrectos'});
      res.status(200).json(success(res.statusCode, {data: data, token}))

      } catch (err) {
      console.log("ERROR LOGIN", err)
      return res.status(500).json(error(res.statusCode, err));
    }
  },
  createUser: async(req, res) => {
    try {
      let {name, last_name, email, password, rol, imagen} = req.body;
      let user = new User({
        name,
        last_name,
        email,
        password: bcrypt.hashSync(password,10),
        rol,
        imagen
      })
      const data = await user.save();
      res.status(200).json(success(res.statusCode, {message: 'Usuario creado'}))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err));
    }
  },
  getAll: async(req, res) => {
    try {
      const data = await User.find();
      res.status(200).json(success(res.statusCode, data))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
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
      const data = await User.paginate(query, optionsPagination(page))
      if (data.data.length >= 1) {
        return res.status(200).json(success(res.statusCode, data))
      }else{
        return res.status(200).json(noResults(res.statusCode, data))
      }
		} catch (err) {
			return res.status(500).json(error(res.statusCode, err))
		}
  },
  getUser: async(req, res) => {
    try {
      const id = req.params.id;
      const data = await User.findById(id);
      res.status(200).json(success(res.statusCode, data))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
    }
  },
  updateUser: async(req, res) => {
    try {
      const id = req.params.id;
      let {name, lastName, email, password, token_medium, img} = req.body;
      let dataUpdate = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        token_medium: token_medium,
        img: img
      }
      const data = await User.findByIdAndUpdate(id, dataUpdate, {new: true})
      res.status(200).json(success(res.statusCode, {message: 'Usuario actualizado'}))
    } catch (err) {
      return res.status(500).json(error(res.statusCode, err))
    }
  }

}
