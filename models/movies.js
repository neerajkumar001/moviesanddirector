// const { pool } = require('../db.js');
const { movies } = require('../config/databaseTable');
let moviesFunction = {};
// async function runQuery(query) {
//     const client = await pool.connect();
//     const output = await client.query(query)
//     return output;
// }

moviesFunction.getAll = async () => {
    try {
        // const client = await pool.connect();
        // const result = await client.query('select * from movies order by rank_id');
        const result = await movies.findAll()

        return result;
    } catch (error) {
        return error;
    }
    // let result = await runQuery('select * from movies order by rank_id');
    // if (result.rowCount != 0) {
    //     console.log(result.rows)
    // } else {
    //     console.log("No Detail found")
    // }
}

moviesFunction.getById = async (id) => {
    try {
        // const client = await pool.connect();
        // const result = await client.query('select * from movies where rank_id=$1', [id]);
        const result = await movies.findAll({ where: { rank_id: id } });
        // let result = await runQuery('select * from movies where rank_id=$1', [id]);
        // if (result.rowCount != 0) {
        //     console.log(result.rows)
        // } else {
        //     console.log("No Detail found")
        // }
        return result;
    }
    catch (error) {
        return error;
    }
}
moviesFunction.insertData = async (movieDetail) => {
    try {
        // const client = await pool.connect();
        // const result = await client.query(`insert into movies  values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        //     // let result = await runQuery(`insert into movies  values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        //     movieDetail);
        const result = await movies.create(movieDetail);
        // if (result.rowCount != 0) {
        //     console.log('Movie Detail Inserted')
        // } else {
        //     console.log("No Detail found")
        // }
        return result;
    }
    catch (error) {
        return error;
    }
    // catch (error) {
    //     throw new Error(error)
    // }
}
moviesFunction.deleteById = async (id) => {
    // const client = await pool.connect();
    // const result = await client.query(`delete from movies where rank_id=$1`, [id]);
    const result = await movies.destroy({
        where: {
            rank_id: id
        }
    })
    // let result = await runQuery(`delete from movies where rank_id=$1`, [id]);
    // if (result.rowCount != 0) {
    //     console.log('Movie Detail Deleted')
    // } else {
    //     console.log("No Detail found")
    // }
    return result;
}
moviesFunction.updateById = async (id, movieDetail) => {
    try {
        // const client = await pool.connect();
        // const result = await client.query(`update movies set director_id =$1,title =$2,Description= $3,
        // Runtime =$4,Genre =$5,Rating =$6,Metascore=$7,Votes =$8, Gross_Earning_in_Mil =$9,
        // Actor= $10,Year= $11   where rank_id=${id}`,
        //     movieDetail)
        const result = await movies.update(
            movieDetail,
            { where: { rank_id: id } }
        )
        // let result = await runQuery(`update movies set director_id =$1,title =$2,Description= $3,
        // Runtime =$4,Genre =$5,Rating =$6,Metascore=$7,Votes =$8, Gross_Earning_in_Mil =$9,
        // Actor= $10,Year= $11   where rank_id=${id}`,
        //     movieDetail);
        // if (result.rowCount != 0) {
        //     console.log('Movie Detail Updated')
        // } else {
        //     console.log("No Detail Updated")
        // }
        return result;
    } catch (error) {
        return error;
    }
}






module.exports = moviesFunction;
