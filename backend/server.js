require('dotenv').config(); // ⬆️ Sabse upar hona chahiye

const express = require('express');
const app = express();
const cors = require('cors');
const connectedDB = require('./config/DB');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Test Route
app.get('/', (req, res) => {
    res.send('Backend Server Running Successfully');
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
connectedDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});