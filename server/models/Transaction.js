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
  }
});


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction