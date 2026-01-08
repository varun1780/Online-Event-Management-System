require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const Event = require('./models/Event');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* -------------------- Multer Configuration -------------------- */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

/* -------------------- MongoDB Connection -------------------- */
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/eventdb';

if (MONGO_URI.includes('localhost') || MONGO_URI.includes('127.0.0.1')) {
    console.warn('⚠️  WARNING: Using local MongoDB connection string. This will likely fail on cloud deployments like Render.');
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

/* -------------------- Routes -------------------- */

// GET all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single event
app.get('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE event (with image upload)
app.post('/api/events', upload.single('image'), async (req, res) => {
    try {
        let eventData = req.body;

        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            eventData.image = imageUrl;
        }

        const event = new Event(eventData);
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// REGISTER for event
app.post('/api/registrations', async (req, res) => {
    const { eventId, name, email } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.registered >= event.capacity) {
            return res.status(400).json({ message: 'Event is full' });
        }

        const registration = new Registration({
            eventId,
            eventName: event.title,
            name,
            email
        });

        await registration.save();

        event.registered += 1;
        await event.save();

        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET all registrations (Admin)
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find().sort({ date: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed initial events
app.post('/api/seed', async (req, res) => {
    const INITIAL_EVENTS = [
        {
            title: 'Tech Innovation Summit 2026',
            date: '2026-03-15',
            time: '09:00',
            location: 'Silicon Valley Convention Center',
            description: 'Join industry leaders to explore the future of AI, Quantum Computing, and Sustainable Tech.',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            price: 299,
            capacity: 500,
            registered: 0
        },
        {
            title: 'Global Design Conference',
            date: '2026-04-20',
            time: '10:00',
            location: 'London ExCeL',
            description: 'A gathering of the world’s most creative minds sharing insights on digital and physical product design.',
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
            price: 150,
            capacity: 300,
            registered: 0
        },
        {
            title: 'Startup Networking Night',
            date: '2026-02-10',
            time: '18:00',
            location: 'WeWork Downtown, NY',
            description: 'Connect with founders, investors, and talent in a casual setting. Drinks and snacks provided.',
            image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
            price: 0,
            capacity: 50,
            registered: 0
        }
    ];

    try {
        await Event.deleteMany({});
        const createdEvents = await Event.insertMany(INITIAL_EVENTS);
        res.json(createdEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------- Server Start -------------------- */
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
