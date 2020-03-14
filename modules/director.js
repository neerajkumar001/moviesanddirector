const { pool } = require('../db.js');
let directorsFunction = {};
async function runQuery(query) {
  const client = await pool.connect();
  const output = await client.query(query)
  return output;

}

directorsFunction.getAll = async () => {
  const client = await pool.connect();
  const result = await client.query('select * from director order by id')
  // let result = await runQuery();
  if (result.rowCount != 0) {
    console.log(result.rows)
  } else {
    console.log("No Detail found")
  }

}

directorsFunction.getById = async (id) => {
  const client = await pool.connect();
  const result = await client.query(`select * from director where id=$1`, [id])
  // console.log(id);output
  // let result = await runQuery(`select * from director where id=$1`, [id]);
  // let result = await runQuery(`select * from director where id=${id}`);
  if (result.rowCount != 0) {
    console.log(result.rows)
  } else {
    console.log("No Detail found")
  }

}
directorsFunction.insertData = async (directorName) => {
  const client = await pool.connect();
  const result = await client.query(`insert into director (director_name) values ($1)`, [directorName]);
  // let result = await runQuery(`insert into director (director_name) values ($1)`, [directorName]);
  // let result = await runQuery(`insert into director (director_name) values (${directorName})`);
  if (result.rowCount != 0) {
    console.log("Director Details inserted")
  } else {
    console.log("No Detail found")
  }

}
directorsFunction.deleteById = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`delete from director where id = $1`, [id]);
    //  let result = await runQuery(`delete from director where id = $1`, [id]);
    // let result = await runQuery(`delete from director where id = ${id}`);
    if (result.rowCount != 0) {
      console.log("Director Details Deleted")
    } else {
      console.log("No Detail found")
    }
  } catch (err) {
    console.log(err);
  }

}
directorsFunction.updateById = async (id, directorName) => {
  const client = await pool.connect();
  const result = await client.query(`update director set director_name = $2   where id = $1`, [id, directorName]);
  // let result = await runQuery(`update director set director_name = $2   where id = $1`, [id, directorName]);
  if (result.rowCount != 0) {
    console.log("Director Details Updated")
  } else {
    console.log("No Detail Updated")
  }

}




module.exports = directorsFunction;
