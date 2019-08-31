/**
 * Author: Himanshu Chawla
 */
const boom  = require("boom"),
      logger = require("../../../../config/logger");
    


transactionGenerator = Object.create(null);

transactionGenerator.generateTransaction = async (req,res,next) => {
   
    try{

       /**
        * Perform your logic here
        * 
        */
        
    }
    catch(err){
        logger.error(err);
        return next(boom.badImplementation(err));
    }
    
};



module.exports = transactionGenerator;