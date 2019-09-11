
const mongoose = require('mongoose');

const customAttribute = new mongoose.Schema({
  name: { type: String, required: true },
  datatype: {
    type: String,
    enum: ["uint", "string", "address", "bool","image"],
    required: true
  },
  value: {}
  
});


  
const TransactionSchema = new mongoose.Schema(
    {
        contractAddress:{ type: String },
        transactionName: { type: String, required: true},
        transactionProperties:{ type:[customAttribute]},
        contractCode: { type: String },
        txHash: { type: String },
        storageType: { 
          type: String,
          enum: ["blockchain","database"],
          required: true
        }

    },{
      'timestamps': {
          'createdAt': 'created_at',
          'updatedAt': 'updated_at'
      }
  })



 const transactions = mongoose.model('Transactions',TransactionSchema,'Transactions');
 module.exports = transactions;