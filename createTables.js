// var fetch = require('node-fetch');

const { Pool } = require('pg');
// let 
const pool = new Pool({
  user: 'neeraj',
  host: 'localhost',
  database: 'neeraj',
  password: 'neeraj12',
  port: 5432,
  max: 2
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000
});

// pool.connect();
// fetch(
//   'https://trello-attachments.s3.amazonaws.com/5e4a127f9e8d93222b3c507a/5e65d2faf068528e4302b917/x/5b29e90033d644379ecd35553d0f4d98/movies.json'
// )
//   .then(function(result) {
//     return result.json();
//   })
//   .then(function(data) {
const directors = async (movieData) => {
  // return new Promise((resolve, reject) => {
  const client = await pool.connect()
  await client
    .query(
      `create table if not exists  director (id  serial primary key,director_name varchar(40) unique)`
    )
  movieData.reduce((acc, res) => {
    if (acc[res.Director] == undefined) {
      acc[res.Director] = 1;

      client
        .query(`insert into director (director_name) values ($1)`, [
          res.Director
        ])
        .catch(err => {
          console.log('duplicate', err);
        });
    }
    return acc;
  }, {});
  client.release();




};
const movies = async (movieData) => {

  const client = await pool.connect()
  await client
    .query(
      `create table if not exists  movies (rank_id integer primary key,director_id integer,title varchar(50) unique ,Description text,
           Runtime integer,Genre varchar(30),Rating decimal(10,1),Metascore varchar(40),Votes integer, Gross_Earning_in_Mil varchar(30),
           Actor varchar(40),Year integer,FOREIGN KEY (director_id) REFERENCES director (id) )`
    )

  movieData.map(async movie => {
    await client
      .query(`select id from director where director_name= ($1)`, [
        movie.Director
      ])
      .then(val => {
        movie.Director = val.rows[0].id;
      })
      .catch(err => {
        console.log('Not Present', err);
      });
    let movieDetails = Object.values(movie);
    await client
      .query(
        `insert into movies values ($1,$10,$2,$3,$4,$5,$6,$7,$8,$9,$11,$12)`,
        movieDetails
      )
      .then(() => {
        console.log('query inserted');
      })
      .catch(err => {
        console.log(movieDetails, err);
      });
  });
  client.release();
};

module.exports = { directors, movies };

//console.log(mov);
// });

//   'https://cors-anywhere.herokuapp.com/' +
//'https://cors-anywhere.herokuapp.com/' +
// 'https://trello-attachments.s3.amazonaws.com/5e4a127f9e8d93222b3c507a/5e65d2faf068528e4302b917/x/5b29e90033d644379ecd35553d0f4d98/movies.json'
