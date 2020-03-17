const Sequelize = require('sequelize');
const movieData = require('../movies_file/movies');
const sequelize = require('./databaseConnection')
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
})
function directortable() {
    director.sync({ force: true }).then(() => {
        movieData.reduce((acc, res) => {
            if (acc[res.Directo00r] == undefined) {
                acc[res.Director] = 1;

                director.create({
                    director_name: res['Director']
                })


            }
            return acc;
        }, {});
    })
}


const movies = sequelize.define('movies', {
    rank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },


    director_id: {
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
    }
    ,
    Runtime: Sequelize.INTEGER,
    Genere: Sequelize.STRING,
    Rating: Sequelize.FLOAT,
    Metascore: Sequelize.STRING,
    Votes: Sequelize.INTEGER,
    Gross_Earning_in_Mil: Sequelize.FLOAT,
    Actor: Sequelize.STRING,
    Year: Sequelize.INTEGER




}, {
    timestamps: false
})
function movie_data() {
    movies.sync({ force: true }).then(() => {

        movieData.map(async movie => {
            // console.log(movie)
            await director.findAll({
                where: {

                    director_name: movie['Director']
                }
            }).then((res) => {
                //console.log(res[0].dataValues.id)
                movie.Director = res[0].dataValues.id;
            })
                .catch(err => {
                    console.log('Not Present', err);
                });

            await movies.create({
                rank_id: movie['Rank'],
                director_id: movie['Director'],
                title: movie.Title,
                Description: movie.Description,
                Runtime: movie.Runtime,
                Genere: movie.Genre,
                Rating: movie.Rating,
                Metascore: movie.Metascore,
                Votes: movie.Votes,
                Gross_Earning_in_Mil: movie.Gross_Earning_in_Mil,
                Actor: movie.Actor,
                Year: movie.Year

            })

        });
    })

}
async function Insertion() {
    await directortable();
    await movie_data();

}
// Insertion();


module.exports = { director, movies };