const mongoose = require('mongoose');

const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message); 
        process.exit(1);
    }
};

module.exports = connectedDB;