const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const User = new Schema({
    name : {type: String, required:true},
    email : {type: String, required:true, unique:true},
    password :{type: String, required:true},
    balance : {type: Number},
    Cart : [{
        type : ObjectId,
        ref : 'Product'
    }]

})

const model =  mongoose.model('User', User)
module.exports = model;