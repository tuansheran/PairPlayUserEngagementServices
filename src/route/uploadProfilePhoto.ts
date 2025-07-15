import express from 'express'
import upload from '../middleware/multer'
import cloudinary from '../services/cloudinary/cloudinary'

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const buffer = req.file?.buffer;
    if (!buffer) return res.status(400).send('No file uploaded');

    const base64Image = buffer.toString('base64')
    const dataURI = `data:${req.file?.mimetype};base64,${base64Image}`

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'my_uploads'
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Upload failed', error);
    res.status(500).send('Upload error');
  }
});

export default router;
