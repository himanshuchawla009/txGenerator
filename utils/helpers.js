module.exports.removeFalsy = (req, res, next) => {
    // console.log("--------------------------",req.body);

    const newObj = {};
    Object.keys(req.body).forEach((prop) => {

        if (typeof req.body[prop] == 'boolean') { // in case of boolean values, do not remove 'false' value
            newObj[prop] = req.body[prop];
        } else if (!!req.body[prop]) { // here check for other falsy values like undefined, null, etc.
            if (typeof req.body[prop] == 'string') {
                newObj[prop] = req.body[prop].trim(); // in case of string trim values
            } else {
                newObj[prop] = req.body[prop]/*.trim()*/;
            }
        }
    });
    req.body = newObj;

    // check for stringified 'undefined' in query parameters
    Object.keys(req.query).forEach(prop => {
        if (req.query[prop] == 'undefined') {
            req.query[prop] = undefined;
        }
    });
    return next();
};