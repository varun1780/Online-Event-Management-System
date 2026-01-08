require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Event = require('./server/models/Event');
const Registration = require('./server/models/Registration');

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Uploads Setup -------------------- */
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

/* -------------------- Multer Configuration -------------------- */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

/* -------------------- MongoDB Connection -------------------- */
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

/* -------------------- Routes -------------------- */
// (your routes stay exactly the same)

/* -------------------- Serve Frontend -------------------- */
const frontendPath = path.join(__dirname, 'dist');
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    app.get('*', (req, res) =>
        res.sendFile(path.join(frontendPath, 'index.html'))
    );
}

/* -------------------- Server Start -------------------- */
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
