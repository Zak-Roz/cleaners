require('dotenv').config();
 
const env = process.env.NODE_ENV; // 'dev' or 'test'
 
const dev = {
  app: {
    port: process.env.PORT
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'kt'
  }
};
const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 8080
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 27017,
    name: process.env.TEST_DB_NAME || 'tkt'
  }
};
 
const config = {
  dev,
  test
};

module.exports = config[env];