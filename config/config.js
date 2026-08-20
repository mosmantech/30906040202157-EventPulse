require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
};

if (!config.mongoUri) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env file!');
    process.exit(1);
}

if (!config.jwt.secret) {
    console.error('FATAL ERROR: JWT_SECRET is not defined in .env file!');
    process.exit(1);
}

module.exports = config;