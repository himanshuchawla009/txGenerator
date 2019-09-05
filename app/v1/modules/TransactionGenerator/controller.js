/**
 * Author: Himanshu Chawla
 */
const boom  = require("boom"),
      storageConnection = require('../Adapters'),
      logger = require("../../../../config/logger"),
      ipfsService = require('../ipfsUploadService');
    


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

        singleUpload(req, res, function(err) {
            if (err) {
              return res.status(422).json({success:true,message:"Failed to upload document/image"});
            }
        
            return res.status(200).json({success:false,'imageUrl': req.file.location});
          });

    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};


transactionGenerator.saveDocToIpfs = async (req,res,next) => {
   
    try{
     
        let result = await ipfsService.uploadDoc(req);
        return res.status(200).json(result);
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