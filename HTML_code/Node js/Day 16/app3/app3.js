const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});