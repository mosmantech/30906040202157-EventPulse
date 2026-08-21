require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/appError');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/event.routes');
const categoryRoutes = require('./routes/category.routes');
const registrationRoutes = require('./routes/registration.routes');
const messageRoutes = require('./routes/message.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();


const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);


    socket.on('join-event', (eventId) => {
        socket.join(eventId);
        console.log(`User ${socket.id} joined room: ${eventId}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


app.set('io', io);

if (config.env === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.params);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stats', statsRoutes);

app.all('{*path}', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);



app.get('/', (req, res) => {
    res.status(200).send('EventPulse API is running successfully on Vercel!');
});

app.all('{*path}', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);


connectDB();


if (process.env.NODE_ENV !== 'production') {
    server.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}


module.exports = app;