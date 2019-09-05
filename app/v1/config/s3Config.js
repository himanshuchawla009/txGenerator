const dotenv = require('dotenv');
dotenv.config();

const config = { 
    "accessKeyId": process.env.ACCESS_ID,
    "secretAccessKey": process.env.SECRET_KEY,
    "region": "us-east-1" 
}

module.exports = config