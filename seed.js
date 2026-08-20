require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User.model');
const Category = require('./models/Category.model');
const Event = require('./models/Event.model');
const Registration = require('./models/Registration.model');
const Message = require('./models/Message.model');

const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();
        console.log("connecting to the database...");

        await Message.deleteMany();
        await Registration.deleteMany();
        await Event.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        const hashedPassword = await bcrypt.hash('1234', 10);
        const admin = await User.create({
            name: 'Super Admin',
            email: 'admin@eventpulse.com',
            password: hashedPassword,
            role: 'admin'
        });

        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: hashedPassword,
            role: 'attendee'
        });


        const categories = await Category.insertMany([
            { name: 'Music', description: 'Concerts and musical events' },
            { name: 'Tech', description: 'Technology and coding workshops' },
            { name: 'Sports', description: 'Sports tournaments and fitness' }
        ]);

        await Event.insertMany([
            {
                title: 'Tech Conference 2026',
                description: 'Latest in web dev and AI',
                category: categories[1]._id,
                date: new Date('2026-10-15'),
                city: 'Cairo',
                venue: 'Cairo Exhibition Center',
                capacity: 100,
                organizer: admin._id
            },
            {
                title: 'Summer Music Fest',
                description: 'Live bands and music',
                category: categories[0]._id,
                date: new Date('2026-09-01'),
                city: 'Alexandria',
                venue: 'Alex Arena',
                capacity: 250,
                organizer: admin._id
            },
            {
                title: 'Marathon Run',
                description: '5k morning run',
                category: categories[2]._id,
                date: new Date('2026-11-05'),
                city: 'Cairo',
                venue: 'Zamalek',
                capacity: 50,
                organizer: admin._id
            },
            {
                title: 'AI Summit',
                description: 'Future of Artificial Intelligence',
                category: categories[1]._id,
                date: new Date('2026-12-01'),
                city: 'Giza',
                venue: 'Smart Village',
                capacity: 150,
                organizer: admin._id
            }
        ]);

        console.log("Seed excuted successfully");
        process.exit();
    } catch (error) {
        console.log(`Error sedding data: ${error}`);
        process.exit(1);
    }
};

seedData();