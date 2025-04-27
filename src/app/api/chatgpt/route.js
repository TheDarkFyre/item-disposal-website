import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { OpenAI } from 'openai';

// Configure multer to save uploads in public/uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), 'public/uploads'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const config = { api: { bodyParser: false } };

const handler = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  let file;
  try {
    file = req.file;
    if (!file) throw new Error('No file uploaded.');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const imageUrl = `${baseUrl}/uploads/${file.filename}`;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini-2025-04-14',
      messages: [
        {
          role: 'system',
          content: 'Given an image, tell me how to safely dispose of the item shown, specifically tailored to San Jose, California. Include recycling options or disposal centers as needed.'
        },
        { role: 'user', content: `Image URL: ${imageUrl}` }
      ],
    });

    const filePath = path.join(process.cwd(), 'public/uploads', file.filename);
    fs.unlink(filePath).catch((err) => console.error('Cleanup error:', err));

    res.status(200).json(completion);
  } catch (err) {
    if (file) {
      const cleanupPath = path.join(process.cwd(), 'public/uploads', file.filename);
      fs.unlink(cleanupPath).catch(() => {});
    }
    res.status(400).json({ error: err.message });
  }
});

export default handler;
