require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const http = require('http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
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
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('join-event', (eventId) => {
        socket.join(eventId);
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


app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});


app.get('/', (req, res) => {
    res.status(200).json({ message: 'EventPulse API is running successfully on Vercel!' });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        environment: process.env.NODE_ENV || "production",
        uptime: `${Math.floor(process.uptime())}s`,
        database: "connected",
        timestamp: new Date().toISOString()
    });
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EventPulse API',
            version: '1.0.0',
            description: 'API Documentation for EventPulse Application',
        },
        servers: [
            {
                url: 'https://30906040202157-event-pulse.vercel.app',
                description: 'Production Server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL }));


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stats', statsRoutes);


app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(errorHandler);


if (process.env.NODE_ENV !== 'production') {
    server.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

module.exports = app;