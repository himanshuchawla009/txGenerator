const ethers = require('ethers');


const getWalletFromPrivatekey = (privateKey) => {
    try {
        var wallet = new ethers.Wallet(privateKey);
        return wallet
    } catch (error) {
        throw error;
    }

}

module.exports =  { getWalletFromPrivatekey }