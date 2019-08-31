var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var transactionSchema = new Schema({
 
    
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }});


var transactions = mongoose.model('Transactions', transactionSchema,'Transactions');

module.exports = transactions;



