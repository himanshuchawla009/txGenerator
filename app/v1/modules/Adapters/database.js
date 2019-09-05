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
                    message:'',
                    success:true
                }
                resolve(res);
              } else {
                reject(err);
              }
            });
          });
    }

    fetchOneTransaction(query){
        return new Promise((resolve, reject) => {
            model.findOne(params, (err, data) => {
              if (!err) {
                resolve(data);
                return cb(err, data);
              } else {
                reject(err);
                return cb(err, false);
              }
            })
              .select(selector)
              .populate(query);
          });
    }

    fetchTransactions(params = {},
        sort = {},
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