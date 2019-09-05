/**
 * Author: Himanshu Chawla
 */
const boom  = require("boom"),
      storageConnection = require('../Adapters')
      logger = require("../../../../config/logger");
    


transactionGenerator = Object.create(null);

transactionGenerator.generateTransaction = async (req,res,next) => {  
    try{

        let { storageType, properties, transactionName } = req.body;

        let connection = storageConnection(storageType);
        
        let txObj = {
            transactionName,
            transactionProperties: properties,
            storageType
        }

        let result = await connection.saveTransaction(txObj);

        res.status(result.status).json(result)
    
    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};



transactionGenerator.fetchTransactions = async (req,res,next) => {
   
    try{

     
       let connection = storageConnection('database');

       let transactions = await connection.fetchTransactions(req.query);

       res.status(200).json({
            success:true,
            data:transactions
        })
        
    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};

transactionGenerator.saveDocToAws = async (req,res,next) => {
   
    try{

     
       let connection = storageConnection('database');

       let transactions = await connection.fetchTransactions(req.query);

       res.status(200).json({
            success:true,
            data:transactions
        })
        
    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};


transactionGenerator.saveDocToIpfs = async (req,res,next) => {
   
    try{

     
       let connection = storageConnection('database');

       let transactions = await connection.fetchTransactions(req.query);

       res.status(200).json({
            success:true,
            data:transactions
        })
        
    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};



transactionGenerator.validateContractData = async (req,res,next) => {
   
    try{

     
       let connection = storageConnection('database');

       let transactions = await connection.fetchTransactions(req.query);

       res.status(200).json({
            success:true,
            data:transactions
        })
        
    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};

module.exports = transactionGenerator;