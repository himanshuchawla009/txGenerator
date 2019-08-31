const env = require('./env');

let constantsObj = {
  
};

switch (env) {
  case 'production':
    constantsObj.baseUrl = 'http://localhost:4000';
    
    break;
  case 'staging':
    constantsObj.baseUrl = 'http://localhost:4000';
   
    break;
  case 'development':
    constantsObj.baseUrl = 'http://localhost:4000';
  
    break;
  default:
    break;
}

module.exports = constantsObj;
