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
	
}