const controller       = require("./controller"),
      { celebrate }    = require('celebrate'),
		validateSchema   = require("./schema");
		




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
    celebrate(validateSchema.generateTransaction),
    controller.generateTransaction
  );
	
}