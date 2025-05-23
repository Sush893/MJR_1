import express from 'express';
import { upload, uploadToS3, getUploadUrl } from '../services/uploadService.js';

const router = express.Router();

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
    console.error("Error generating upload URL:", error);
    res.status(500).json({ message: "Failed to generate upload URL", error: error.message });
  }
});

// Direct upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = await uploadToS3(req.file);
    res.json({ message: "File uploaded successfully", url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router; 