import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import multerS3 from 'multer-s3';

dotenv.config();

const imageUpload = () => {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: REGION,
  });
  const storage = multerS3({
    s3: new AWS.S3(),
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 },
  });
};

export { imageUpload };
