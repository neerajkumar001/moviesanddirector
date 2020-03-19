const Sequelize = require('sequelize');

const sequelize = require('./   ')
// sequelize
// .authenticate();

const director = sequelize.define('directors', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    director_name: {
        type: Sequelize.STRING, unique: true,
    }
}, {
    timestamps: false
});
const movies = sequelize.define('movies', {
    rank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, director_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'directors',
            key: 'id'
        },
        // references: 'dirs', // <<< Note, its table's name, not object name
        // referencesKey: 'id', // <<< Note, its a column name

        onUpdate: "cascade",
        onDelete: "cascade",
    },
    title: {
        type: Sequelize.STRING, unique: true,
    }, Description: {
        type: Sequelize.STRING
    },
    Runtime: Sequelize.INTEGER,
    Genere: Sequelize.STRING,
    Rating: Sequelize.FLOAT,
    Metascore: Sequelize.STRING,
    Votes: Sequelize.INTEGER,
    Gross_Earning_in_Mil: Sequelize.FLOAT,
    Actor: Sequelize.STRING,
    Year: Sequelize.INTEGER
}, { timestamps: false });

module.exports = { director, movies };