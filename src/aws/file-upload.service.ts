import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();
const AWS_S3_BUCKET_NAME = process.env.AWS_PUBLIC_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID, //// SDK automatically picked up these values from your EC2 instance IAM role
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
export class FileUploadService {
  static async uploadSeeder(image, urlKey) {
    try {
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: urlKey,
        Body: image,
        ACL: 'public-read',
      };
      const s3_upload = await s3.upload(params).promise();
      return s3_upload.Key;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  static async upload(image, urlKey) {
    try {
      const mimetype = image.mimetype.split('/')[1];
      urlKey = `${urlKey}.${mimetype}`;
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: urlKey,
        Body: image.buffer,
        ACL: 'public-read',
      };
      const s3_upload = await s3.upload(params).promise();
      return s3_upload.Key;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  static async delete(key) {
    try {
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
      };
      await s3.deleteObject(params).promise();
    } catch (error) {
      Logger.log(error);
    }
  }
  static async getUploadURL(Key) {
    const s3Params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key,
      Expires: 90000000,
      ContentType: 'video/mp4',
      ACL: 'public-read',
    };
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
    return JSON.stringify({
      uploadURL,
      Key,
    });
  }
}
