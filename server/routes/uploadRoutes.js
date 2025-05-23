import express from 'express';
import { upload, uploadToS3, getUploadUrl } from '../services/uploadService.js';

const router = express.Router();

// Error handling middleware for multer errors
const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error('Multer error:', {
      error: err.message,
      code: err.code,
      field: err.field
    });

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File size exceeds the limit of 100MB'
      });
    }
    return res.status(400).json({
      message: err.message || 'Error processing file upload'
    });
  }
  next();
};

// Route for getting pre-signed URLs
router.post("/get-upload-url", async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    if (!fileName || !fileType) {
      return res.status(400).json({ message: "Missing fileName or fileType" });
    }

    const urls = await getUploadUrl(fileName, fileType);
    res.json(urls);
  } catch (error) {
    console.error("Error generating upload URL:", {
      error: error.message,
      fileName: req.body.fileName,
      fileType: req.body.fileType
    });
    res.status(500).json({ 
      message: "Failed to generate upload URL",
      error: error.message 
    });
  }
});

// Direct upload endpoint
router.post("/upload", (req, res) => {
  console.log('Received upload request');

  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Multer error in upload route:", {
        error: err.message,
        code: err.code,
        field: err.field
      });
      return res.status(400).json({ 
        message: err.message || "Error processing file upload" 
      });
    }

    try {
      if (!req.file) {
        console.error("No file in request");
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log('File received:', {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });

      const fileUrl = await uploadToS3(req.file);
      console.log('Upload successful:', { url: fileUrl });
      
      res.json({ 
        message: "File uploaded successfully", 
        url: fileUrl 
      });
    } catch (error) {
      console.error("Error in upload route:", {
        error: error.message,
        code: error.code,
        filename: req?.file?.originalname
      });
      
      res.status(500).json({ 
        message: "Failed to upload file to storage",
        error: error.message 
      });
    }
  });
});

export default router; 