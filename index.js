
const express = require('express');
const director = require('./controller/director')
const movie = require('./controller/movies')
const host = '127.0.0.1';
const port = 3000;
let app = express();
var logger = require('morgan');

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })
app.use(logger("hi"));
app.use('/director', director);
app.use('/movie', movie);


// app.get('/movies.json', (req, res) => {
//     res.sendFile(__dirname + '/movies.json');
// });
app.listen(port, host, () => {
    console.log(host + ' host started at ' + port + ' port');
});

