module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: "mongodb://localhost:27017/articles_db",
  secretJwtToken: "test",
};