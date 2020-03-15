const Sequelize = require('sequelize');
const movieData = require('./movies.json');
const sequelize = new Sequelize('movieAndDirectorApi', 'neeraj', 'neeraj12', {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        console.log("Success!");
        const director = sequelize.define('testmovies', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            director_name: {
                type: Sequelize.STRING, unique: true,
            }
        }, {
            timestamp: false
        })
        director.sync({ force: true }).then(() => {
            movieData.reduce((acc, res) => {
                if (acc[res.Director] == undefined) {
                    acc[res.Director] = 1;

                    director.create({
                        director_name: res['Director']
                    })


                }
                return acc;
            }, {});
        })
        // var Posts = sequelize.define('posts', {
        //     title: {
        //         type: Sequelize.STRING
        //     },
        //     content: {
        //         type: Sequelize.STRING
        //     }
        // }, {
        //     freezeTableName: true
        // });

        // Posts.sync().then(function () {

        //     return Posts.create({
        //         title: 'Getting Started with PostgreSQL and Sequelize',
        //         content: 'Hello there'
        //     });
        // });


    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('api', 'neeraj', 'neeraj12', {
//     host: 'localhost',
//     dialect: 'postgres',
//     // pool: {
//     //     max: 9,
//     //     min: 0,
//     //     idle: 10000
//     // }
// });

// sequelize.authenticate().then(() => {
//     console.log("Success!");
// }).catch((err) => {
//     console.log(err);
// });