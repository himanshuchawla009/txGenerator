const { Joi } = require('celebrate');

module.exports = {
    generateTransaction: {
        body: Joi.object().keys({
            "transactionName": Joi.string().required(),
           
        })
    }
}