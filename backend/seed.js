const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel')

dotenv.config();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'YourStrongPassword123!';

const seedAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully.');


        const existingAdmin = await User.findOne({ username: ADMIN_USERNAME });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        console.log('Admin user not found. Creating a new one...');
        const adminUser = new User({
            username: ADMIN_USERNAME,
            password: ADMIN_PASSWORD, // We provide the plain-text password here.
        });

        await adminUser.save();

        console.log('----------------------------------------------------');
        console.log('Admin user created successfully!');
        console.log(`Username: ${ADMIN_USERNAME}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
        console.log('You can now use these credentials to log in.');
        console.log('----------------------------------------------------');

    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        console.log('Disconnecting from database...');
        await mongoose.disconnect();
        console.log('Database disconnected.');
    }
}

seedAdmin();