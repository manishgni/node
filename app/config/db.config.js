module.exports = {
    HOST: "localhost",
    USER: "sanjay",
    PASSWORD: "Sanjay@123",
    DB: "node",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};