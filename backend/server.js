const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

// Token และ URL สำหรับ PocketHost
const POCKETHOST_TOKEN = '20260301eink'; 
const POCKETHOST_URL = 'https://app-tracking.pockethost.io/api/collections/notes/records';

app.use(cors());
app.use(express.json());

// Middleware ตรวจสอบ Token จาก Frontend ของเรา
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === SECRET_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// --- Endpoints ---

// 1. GET: ดึงข้อมูลจาก PocketHost
app.get('/api/notes', async (req, res) => {
  try {
    const response = await fetch(`${POCKETHOST_URL}?sort=-created`, {
      headers: { 'Authorization': `Bearer ${POCKETHOST_TOKEN}` }
    });
    const data = await response.json();
    res.json(data.items || []); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from PocketHost' });
  }
});

// 2. POST: สร้างโน้ตใหม่ส่งไป PocketHost
app.post('/api/notes', authenticate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const response = await fetch(POCKETHOST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POCKETHOST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content, user_id: 2 })
    });
    const newNote = await response.json();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// 3. DELETE: ลบโน้ตใน PocketHost
app.delete('/api/notes/:id', authenticate, async (req, res) => {
  try {
    const response = await fetch(`${POCKETHOST_URL}/${req.params.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${POCKETHOST_TOKEN}` }
    });
    if (response.ok) {
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`🔗 Connected to PocketHost API`);
});