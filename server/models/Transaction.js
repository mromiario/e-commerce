const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TransactionSchema = new Schema({
  User : {
    type : ObjectId,
    ref : 'User'
  },
  product : {
    type : ObjectId,
    ref : 'Product'
  },
  qty: {
    type: Number,
    min: 0
  },
  total: {
    type: Number
  },
  paymentStatus:{
    type: Boolean,
    default: false
  },
  finishStatus:{
    type: Boolean,
    default:false
  }
},
{ timestamps: { createdAt: 'created_at'}});


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction