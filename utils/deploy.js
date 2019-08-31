const ethers = require("ethers");

deploySolidityContract = async (abi, byteCode) => {

return new Promise(async (resolve, reject) => {

    let provider = ethers.getDefaultProvider('rinkeby');
    let privateKey = '';
    let wallet = new ethers.Wallet(privateKey, provider);

    let factory = new ethers.ContractFactory(abi, byteCode, wallet);

    try{
        let contract = await factory.deploy();
        await contract.deployed();
        resolve(contract);
    }
    catch(err)
    {
        reject(err);
    }

});
}

module.exports = {
    deploySolidityContract: deploySolidityContract
}


