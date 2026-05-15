const express = require('express');
const app = express();
const cors = require('cors');
const connectedDB = require('./config/DB');

require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

connectedDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});