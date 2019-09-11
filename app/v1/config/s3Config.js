const dotenv = require('dotenv');
dotenv.config();

const config = { 
    "accessKeyId": process.env.ACCESS_KEY,
    "secretAccessKey": process.env.SECRET_KEY,
    "region": "ap-south-1" 
   
}

module.exports = config