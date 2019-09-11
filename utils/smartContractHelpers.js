const solc = require("solc");
const ethers = require("ethers");

compileContract = async (contract) => {

    return new Promise(async (resolve, reject) => {
    try{
        var input = {
            language: 'Solidity',
            sources: {
                'test.sol': {
                    content: contract
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': [ '*' ]
                    }
                }
            }
        }
         
        var output = JSON.parse(solc.compile(JSON.stringify(input)));
        console.log("output",output)
        console.log("output",output.contracts['test.sol']['template'].evm.bytecode.object)
        console.log("abi",output.contracts['test.sol']['template'].abi)

        resolve(output)
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
