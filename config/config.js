var config = {};

config.port = process.env.PORT || 3000;
config.dbhost = process.env.DBHOST || 'mongodb://localhost/project';
config.port = process.env.PORT || '3000';
config.host = process.env.HOST || 'http://localhost';
//process.env.NODE_ENV = 'development';

module.exports = config;
