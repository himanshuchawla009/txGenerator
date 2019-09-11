const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/s3Config');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: config.region
});

console.log("process.env.BUCKET_NAME",process.env.BUCKET_NAME)

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype !== 'application/pdf' ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

module.exports.uploadToAws = multer({
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: "txgen",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'aws'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
}).single('aws');


