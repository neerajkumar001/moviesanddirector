const { movies } = require('../config/databaseTable');
let moviesFunction = {};

moviesFunction.getAll = async () => {
    try {
        const result = await movies.findAll()

        return result;
    } catch (error) {
        return error;
    }
}

moviesFunction.getById = async (id) => {
    try {
        const result = await movies.findAll({ where: { rank_id: id } });
        return result;
    }
    catch (error) {
        return error;
    }
}
moviesFunction.insertData = async (movieDetail) => {
    try {
        const result = await movies.create(movieDetail);
        return result;
    }
    catch (error) {
        return error;
    }
}
moviesFunction.deleteById = async (id) => {
    const result = await movies.destroy({
        where: {
            rank_id: id
        }
    })
    return result;
}
moviesFunction.updateById = async (id, movieDetail) => {
    try {
        const result = await movies.update(
            movieDetail,
            { where: { rank_id: id } }
        )
        return result;
    } catch (error) {
        return error;
    }
}






module.exports = moviesFunction;
