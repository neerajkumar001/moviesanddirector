const { pool } = require('../db.js');
let moviesFunction = {};
// async function runQuery(query) {
//     const client = await pool.connect();
//     const output = await client.query(query)
//     return output;
// }

moviesFunction.getAll = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from movies order by rank_id');
        return result;
    } catch (err) {
        return '500';
    }
    // let result = await runQuery('select * from movies order by rank_id');
    // if (result.rowCount != 0) {
    //     console.log(result.rows)
    // } else {
    //     console.log("No Detail found")
    // }
}

moviesFunction.getById = async (id) => {
    const client = await pool.connect();
    const result = await client.query('select * from movies where rank_id=$1', [id]);
    // let result = await runQuery('select * from movies where rank_id=$1', [id]);
    // if (result.rowCount != 0) {
    //     console.log(result.rows)
    // } else {
    //     console.log("No Detail found")
    // }
    return result;
}
moviesFunction.insertData = async (movieDetail) => {
    const client = await pool.connect();
    const result = await client.query(`insert into movies  values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        // let result = await runQuery(`insert into movies  values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        movieDetail);
    // if (result.rowCount != 0) {
    //     console.log('Movie Detail Inserted')
    // } else {
    //     console.log("No Detail found")
    // }
    return result;
}
moviesFunction.deleteById = async (id) => {
    const client = await pool.connect();
    const result = await client.query(`delete from movies where rank_id=$1`, [id]);
    // let result = await runQuery(`delete from movies where rank_id=$1`, [id]);
    // if (result.rowCount != 0) {
    //     console.log('Movie Detail Deleted')
    // } else {
    //     console.log("No Detail found")
    // }
    return result;
}
moviesFunction.updateById = async (id, movieDetail) => {
    const client = await pool.connect();
    const result = await client.query(`update movies set director_id =$1,title =$2,Description= $3,
    Runtime =$4,Genre =$5,Rating =$6,Metascore=$7,Votes =$8, Gross_Earning_in_Mil =$9,
    Actor= $10,Year= $11   where rank_id=${id}`,
        movieDetail)
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
}






module.exports = moviesFunction;
