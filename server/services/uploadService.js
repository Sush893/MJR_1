import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer configuration
export const storage = multer.memoryStorage();

// Define allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type! Allowed types are: ${allowedTypes.join(', ')}`));
    }
  },
});

export const uploadToS3 = async (file) => {
  try {
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
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
    console.error("Error generating upload URL:", error);
    throw error;
  }
}; 