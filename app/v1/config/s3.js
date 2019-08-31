const Path = require('path');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const awsConfig = require('./s3Config');
dotenv.config();

AWS.config(awsConfig);

const s3 = new AWS.S3();

const myBucket = process.env.BUCKET_NAME;

const myKey = process.env.BUCKET_KEY;

// s3.createBucket({ Bucket: myBucket }, function (err, data) {

// 	if (err) {

// 		console.log(err);

// 	} else {
// 		console.log(data);
// 		/* params = { Bucket: myBucket, Key: myKey, Body: 'Hello!' };

// 		s3.putObject(params, function (err, data) {

// 			if (err) {

// 				console.log(err)

// 			} else {

// 				console.log("Successfully uploaded data to myBucket/myKey");

// 			}

// 		}); */

// 	}

// });

module.exports = s3;
