/**
 * Author: Himanshu Chawla
 */
const boom  = require("boom"),
      storageConnection = require('../Adapters'),
      logger = require("../../../../config/logger"),
      ipfsService = require('../ipfsUploadService'),
      multer = require('multer'),
      ethers = require('ethers'),
      awsService = require('../AwsUploadService');
    


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

    
       let transactions = await connection.fetchTransactions();

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

        awsService.uploadToAws(req, res, function(err) {
            if (err) {

              return res.status(422).json({success:false,message:err});
            }
        
            return res.status(200).json({success:true,message:"successfully uploaded to aws",'data': req.file.location});
          });

    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};


transactionGenerator.ipfsFile = multer({
    // multer settings
    limits: { fileSize: 20 * 1024 * 1024 },
    //storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype !== 'application/pdf' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/jpe' &&
            file.mimetype !== 'image/jpg'&&
            file.mimetype !== 'image/png'
        ) {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false);
        }
        cb(null, true);
    }
}).single('ipfs');

transactionGenerator.uploadDocToIpfs = async (req, res, next) => {
    try {
        let result = await ipfsService.uploadDoc(req);

        return res.status(200).json(result);
    } catch (err) {
        logger.debug('Error occured while uploading file to ipfs');
        logger.error(err);
        next(err);
    }
};




transactionGenerator.validateContractData = async (req,res,next) => {
   
    try{

     
       let connection = storageConnection('database');

       let transaction = await connection.fetchOneTransaction(req.query.transactionId);

       if(transaction.storageType === 'blockchain') {
        const isCompiled = await compileContract(transaction.contractCode);
        if (isCompiled) {
            const abi = isCompiled.contracts['test.sol']['template'].abi;
            const bytecode =
                '0x' + isCompiled.contracts['test.sol']['template'].evm.bytecode.object;
 
        let provider = ethers.getDefaultProvider('rinkeby');
        let code = await provider.getCode(transaction.contractAddress);

        res.status(200).json({
             success:true,
             bytecode: bytecode.length,
             code:code.length,
             validate: bytecode.toLowerCase() == code.toLowerCase()
         })
         
       } else {
        res.status(200).json({
            success:false,
            data:"error in compilation"
        })
       }
       
    } else {
        res.status(200).json({
            success:true,
            message: "This transaction doesn,t exist on blockchain"
        })
    }
}
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};

module.exports = transactionGenerator;