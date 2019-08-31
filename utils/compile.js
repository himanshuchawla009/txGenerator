const solc = require("solc");
const logger = require("../config/logger");


compileContract = async (contract) => {

    return new Promise(async (resolve, reject) => {
    try{

        const contractObject = await solc.compile(JSON.stringify(contract),1);

        if(contractObject["errors"])
        {
            logger.error(contractObject["errors"]);
            reject(contractObject["errors"]);
        }
        else
        {
            resolve(contractObject);
        }
    }
    catch(err)
    {
        logger.error(err);
        reject(err);
    }
    });   

}

module.exports = {
    compileContract: compileContract
}