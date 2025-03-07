const {textRequired, minCharacters} = require('../util/messageModels');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: textRequired('el nombre'),
    min: minCharacters(3)
  },
  last_name: {
    type: String,
    required: textRequired('los apellidos'),
    min: minCharacters(3)
  },
  email: {
    type: String,
    unique:true,
    required: textRequired('el correo electrónico')
  },
  password: {
    type: String,
    required: textRequired('la contraseña'),
  },
  imagen: {
    type: String
  },
  rol: {
    type: String,
    enum: ['adm_nl', 'vn_tas']
  },
  status:{
    type: Boolean,
    default: true
  }
},{timestamps: true})

UserSchema.methods.toJson = () => {
  const { __v, password, _id, ...user  } = this.toObject();
  user.uid = _id;
  delete user.password;
  return user;
}
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});
module.exports = mongoose.model('Users', UserSchema);
