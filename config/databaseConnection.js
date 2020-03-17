const Sequelize = require('sequelize');

module.exports = new Sequelize('movieAndDirectorApi', 'neeraj', 'neeraj12', {
    host: 'localhost',
    dialect: 'postgres'
});
