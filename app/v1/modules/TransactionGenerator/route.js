const controller       = require("./controller"),
      { celebrate }    = require('celebrate'),
		validateSchema   = require("./schema");
		

propertyValidator = (req,res,next)=>{
	try {
		let properties = req.body.properties;
		let duplicatePropertyFound = false;
		let duplicateProperty = '';
		for (var i = 0; i < properties.length; i++) {
			for (var j = 0; j < properties.length; j++) {
			   
				if (properties[i]) {
					if (i != j && properties[i].name === properties[j].name) {
						duplicatePropertyFound = true;
						duplicateProperty = properties[i].name;
						break;
					}
				}
			}
		}
	  
		if (duplicatePropertyFound) {
			return res.status(200).json({
				status: 200,
				success: false,
				message: `Property name should be unique.${duplicateProperty} property added more than one time.`
			});
		}

		if (properties.length === 0) {
			return res.status(200).json({
				status: 200,
				success: false,
				message: 'Please add properties to the transaction'
			});
		}

		return next()
	} catch (error) {
	   next(error);
	}
}



module.exports = function (router) {



 /**
	* @swagger
	* /transaction/generateTransaction:
	*   post:
	*     description: Api to generate any transaction
	*     tags:
	*       - Transactions
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: transactionName
	*         description: name of the transaction
	*         in: body
	*         required: true
	*         type: string
	*     responses:
	*       200:
	*        	description: Success message
	*/
	router.post('/transaction/generateTransaction',
		propertyValidator,
		celebrate(validateSchema.generateTransaction),
		controller.generateTransaction
	);

	/**
	* @swagger
	* /file/uploadAws:
	*   post:
	*     description: Api to upload file to aws
	*     tags:
	*       - File
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: awd
	*         description: file to be uploaded
	*         in: body
	*         required: true
	*         type: file
	*     responses:
	*       200:
	*        	description: Success message
	*/
	router.patch('/transaction/uploadToAws',
		controller.saveDocToAws
	);


	/**
	* @swagger
	* /file/uploadIpfs:
	*   patch:
	*     description: Api to upload file to ipfs
	*     tags:
	*       - File
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: aws
	*         description: file to be uploaded
	*         in: body
	*         required: true
	*         type: file
	*     responses:
	*       200:
	*        	description: Success message
	*/
	router.patch('/transaction/uploadToIpfs',
	    controller.ipfsFile,
		controller.uploadDocToIpfs
    );


	/**
	* @swagger
	* /transactions/all:
	*   patch:
	*     description: Api to list all transactions
	*     tags:
	*       - transactions
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: page
	*         description: page number of transactions
	*         in: query
	*         required: false
	*         type: number
	*       - name: limit
	*         description: number of transactions to be fetched
	*         in: query
	*         required: false
	*         type: number
	*       - name: storageType
	*         description: transactions from a specific storage (blockchain,database)
	*         in: query
	*         required: false
	*         type: string
	*     responses:
	*       200:
	*        	description: transactions data
	*/
	router.get('/transaction/allTransactions',
		controller.fetchTransactions
	);
	
}