import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.S3_REGION;
const accessKey = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  region: bucketRegion,
});

const upload = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, randomImageName() + '_' + path.basename(file.originalname));
    },
  }),
});

export default upload;
