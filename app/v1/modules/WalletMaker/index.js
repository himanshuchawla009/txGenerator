const ethers = require('ethers');


const getWalletFromPrivatekey = (privateKey) => {
    try {
        const prov =  ethers.getDefaultProvider('rinkeby');
        const wallet = new ethers.Wallet(privateKey,prov);
        return wallet
    } catch (error) {
        throw error;
    }

}

module.exports =  { getWalletFromPrivatekey }