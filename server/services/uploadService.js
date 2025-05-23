import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Validate AWS configuration
const requiredEnvVars = ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'S3_BUCKET_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  throw new Error('Missing required AWS configuration');
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Define allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

// Multer configuration
export const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
  fileFilter: function (req, file, cb) {
    console.log('Received file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.error('Invalid file type:', file.mimetype);
      cb(new Error(`Invalid file type! Allowed types are: ${allowedTypes.join(', ')}`));
    }
  },
});

export const uploadToS3 = async (file) => {
  try {
    console.log('Attempting to upload file to S3:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bucket: process.env.S3_BUCKET_NAME
    });

    const key = `${Date.now()}_${file.originalname}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
    console.log('Successfully uploaded file to S3:', {
      url: fileUrl,
      key: key
    });

    return fileUrl;
  } catch (error) {
    console.error('Error uploading to S3:', {
      error: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
      filename: file.originalname
    });
    throw error;
  }
};

export const getUploadUrl = async (fileName, fileType) => {
  try {
    const key = `${Date.now()}_${fileName}`;
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    
    const uploadUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    return {
      uploadUrl,
      fileUrl: uploadUrl
    };
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw error;
  }
}; 