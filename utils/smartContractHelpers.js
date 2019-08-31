const solc = require("solc");
const ethers = require("ethers");

compileContract = async (contract) => {

    return new Promise(async (resolve, reject) => {
    try{
        const contractObject = await solc.compile(contract,1);
        if(!contractObject.errors)
        {
            resolve(contractObject);
        }
        else
        {
            reject(contractObject.errors);
        }
    }
    catch(err)
    {
        reject(err);
    }
    });   

}






const deployContract = async (abi, byteCode, privateKey) => {
    try {
        return new Promise(async (resolve, reject) => {
            
            try {

                const prov =  ethers.getDefaultProvider('rinkeby');

                let newWallet = new ethers.Wallet(privateKey, prov);
                let factory = new ethers.ContractFactory(abi, byteCode, newWallet);
                let contract = await factory.deploy();

                resolve({ hash: contract.deployTransaction.hash });

              
            } catch (error) {
                console.log("error", error);
                reject(error);
            }
        });
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};




module.exports = {
    compileContract,
    deployContract
}
