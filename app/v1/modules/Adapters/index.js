let blockchain = require('./blockchain');
let database = require('./database');

module.exports = (storageType,network = 'rinkeby')=>{
    if(storageType === 'blockchain') {
       return new blockchain(network);
    } else {
       return new database();
    }
}