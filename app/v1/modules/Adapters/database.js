/**
 * Himanshu Chawla
 */

let model = require('../TransactionGenerator/model'),
    date = require('../../../../utils/datesHelper'),
       _ = require('lodash');

class DatabaseConnector {
    
     saveTransaction(obj) {
        return new Promise((resolve, reject) => {
            obj.createdAt = date.unixTimestamp();
            new model(obj).save((err, data) => {
              if (!err) {
                let res = {
                    status:200,
                    message:'Your transaction has been successfully saved',
                    success:true
                }
                resolve(res);
              } else {
                reject(err);
              }
            });
          });
    }

    fetchOneTransaction(id){
        return new Promise((resolve, reject) => {
            model.findOne({_id:id}, (err, data) => {
              if (!err) {
                resolve(data);
              } else {
                reject(err);
              }
            })
          });
    }

    fetchTransactions(params = {},
        sort = { created_at:-1},
        skip = 0,
        limit = 0,
        selector = '',
        query = '',
        cb = () => { }){
            return new Promise((resolve, reject) => {
                model.find(params, (err, data) => {
                  if (!err) {
                    resolve(data);
                    return cb(err, data);
                  } else {
                    reject(err);
                    return cb(err, false);
                  }
                })
                  .sort(sort)
                  .select(selector)
                  .populate(query)
                  .skip(skip)
                  .limit(limit);
              });
    }

    


}

module.exports = DatabaseConnector;