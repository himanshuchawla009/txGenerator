const dotenv = require('dotenv');
dotenv.config();

const config = { 
    "accessKeyId": process.env.ACCESS_ID,
    "secretAccessKey": process.env.SECRET_KEY,
    "region": "ap-southeast-1" 
}

module.exports = config