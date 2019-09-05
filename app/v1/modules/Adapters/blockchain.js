/**
 * Himanshu Chawla
 */

 const ethers = require('ethers');
 const dotenv = require('dotenv');
 const database = require('./database');
 const { compileContract, deployContract } = require('../../../../utils/smartContractHelpers');
 dotenv.config();

 class BlockchainConnector {
     constructor(network='rinkeby') {
         this.network =  network
     }

     async saveTransaction(obj) {
        try {
            let properties = obj.properties;
    
            /**
             * Converting user defined datatypes like images, documents
             * to smart contract supported datatype "string" because images
             * and documents cannot be stored directly in blockchain so i will
             * be storing here ipfs or amazon s3 urls for docs and images.
             */
            let codeUpdatedProperties = properties.map(property => {
                if (property.datatype === 'image') {
                    property.datatype = 'string';
                    return {
                        datatype:property.datatype,
                        name: templateName+property.name //appending template name so that there will less chances of attribute name getting conflicted with solidity syntax
                    };
                }
                return {
                    datatype:property.datatype,
                    name:tokenName+property.name
                };
            });
    
            /**
             * Creating wallet using existing private key
             */
            let wallet = walletMaker.getWalletFromPrivatekey(process.env.PRIVATE_KEY);
            let ownerWalletAddress = wallet.address;

            /**
             * Saving all transaction properties in to a generic smart contract
             * using ejs template which will be deployed to blockchain and
             * smart contract data can be verified using digital signatures from frontend
             */
            let txContract = ejs.render(
                erc721, 
                {
                    properties: codeUpdatedProperties,
                    ownerAddress: ethers.utils.getAddress(ownerWalletAddress)                },
                {}
            );
            const isCompiled = await compileContract(txContract);
            if (isCompiled) {
                const abi = isCompiled.contracts[':' + contractName].interface;
                const bytecode =
                    '0x' + isCompiled.contracts[':' + contractName].bytecode;
                const { hash } = await deployContract(
                    abi, bytecode, process.env.PRIVATE_KEY
                );

                /**
                 * 
                 * Saving a copy of blockchain transaction in to database
                 * as requirement is to record any number of properties of any datatype
                 * in blockchain so writing functions in smart contract to query all
                 * properties in advance is not possible as we don't know what properties will be 
                 * entered by user.
                 * So Here i am saving a copy in database along with blockchain smart contract and
                 * user can verify that same data exist in blockchain and database by using digital 
                 * signtures from frontend
                 */
                let dbConn = new database();
                let txObj = {
                    ...obj,
                    contractCode: txContract,
                    txHash: hash
                }
                await dbConn.saveTransaction(txObj);
    
    
                return {
                    status: 200,
                    success: true,
                    message: "Your transaction has been sent to blockchain"
                };
    
               
            } else {
                return {
                    status: 200,
                    success: false,
                    message: "Failed to compile your transaction"
                };
            }
        } catch (error) {
            throw error;
        }
     }


 }

 module.exports = BlockchainConnector;