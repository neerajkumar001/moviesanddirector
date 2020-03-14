const tableFunctionQuery = require('./createTables.js');
const directorsFunction = require('./modules/director.js');
const moviesFunction = require('./modules/movies.js');
const movieData = require('./movies.json');
async function table() {
    await tableFunctionQuery.directors(movieData);
    await tableFunctionQuery.movies(movieData);
}
// directorsFunction.getAll();
//directorsFunction.getById('1');
// directorsFunction.deleteById('1');
//directorsFunction.insertData('neera');
// directorsFunction.updateById('126', 'ror');
// moviesFunction.getAll();
moviesFunction.getById('2');
// moviesFunction.deleteById('1');
// moviesFunction.insertData()
 //moviesFunction.updateById();

//table();