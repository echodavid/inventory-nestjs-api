

export const AppConfig = () => ({
    enviroment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
})