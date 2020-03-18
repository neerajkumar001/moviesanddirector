
const express = require('express');
const director = require('./controller/director')
const movie = require('./controller/movies')
const host = '127.0.0.1';
const port = process.env.PORT || 3000;
let app = express();
var morgan = require('morgan');
const middleware = require('./middleware/errorMiddleware')

const fs = require('fs')
app.get('/', (req, res) => {
    res.sendFile('./index.html');
})
app.use(morgan('dev'));
//  morgan('tiny')
var accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/director', director);
app.use('/movie', movie);
app.use(middleware);



// app.get('/movies.json', (req, res) => {
//     res.sendFile(__dirname + '/movies.json');
// });
app.listen(port, host, () => {
    console.log(host + ' host started at ' + port + ' port');
});

