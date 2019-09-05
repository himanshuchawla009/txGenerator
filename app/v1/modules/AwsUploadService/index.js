const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/s3Config');

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: config.region
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'txgenerator',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

const uploadToIpfs = multer({
    // multer settings
    limits: { fileSize: 20 * 1024 * 1024 },
    //storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype !== 'application/pdf' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/jpe' &&
            file.mimetype !== 'image/jpg'
        ) {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false);
        }
        cb(null, true);
    }
}).single('ipfs');

module.exports = upload;