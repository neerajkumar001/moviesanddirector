const { director, movies } = require('./databaseTable')

const movieData = require('../movies_file/movies');
async function directortable() {
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
}
async function movie_data() {
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
    // await directortable();
    await movie_data();

}
Insertion();
