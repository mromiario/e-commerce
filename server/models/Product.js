const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Product = new Schema({
    name: {type : String , required:true},
    stock: {type : String, required:true},
    price: {type : Number},
    image: {type : String},
    seller : {type : Schema.Types.ObjectId, ref: 'User'}
  });

  const Model = mongoose.model('Product', Product);

  module.exports = Model;