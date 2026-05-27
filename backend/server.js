if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const connectedDB = require('./config/DB');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend Server Running Successfully');
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
connectedDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error('DB Connection Failed:', err.message);
    process.exit(1);
});