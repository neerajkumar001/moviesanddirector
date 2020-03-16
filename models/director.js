const { pool } = require('../db.js');
const director = require('../testing');
let directorsFunction = {};
// async function runQuery(query) {
//   const client = await pool.connect();
//   const output = await client.query(query)
//   return output;

// }

directorsFunction.getAll = async () => {
  try {
    // const client = await pool.connect();
    // const result = await client.query('select * from director order by id')
    const result = await director.findAll()
    // let result = await runQuery();
    if (result.rowCount != 0) {
      console.log("hii")
      return result;

    } else {
      return "No Detail found"
    }
  }
  catch (error) {

    return error;

  }

}

directorsFunction.getById = async (id) => {
  const client = await pool.connect();
  const result = await client.query(`select * from director where id=$1`, [id])

  // console.log(id);output
  // let result = await runQuery(`select * from director where id=$1`, [id]);
  // let result = await runQuery(`select * from director where id=${id}`);
  // if (result.rowCount != 0) {
  //   console.log(result.rows)
  // } else {
  //   console.log("No Detail found")
  // }

  return result;

}
directorsFunction.insertData = async (directorName) => {
  const client = await pool.connect();
  const result = await client.query(`insert into director (director_name) values ($1)`, [directorName]);
  // let result = await runQuery(`insert into director (director_name) values ($1)`, [directorName]);
  // let result = await runQuery(`insert into director (director_name) values (${directorName})`);
  // if (result.rowCount != 0) {
  //   console.log("Director Details inserted")
  // } else {
  //   console.log("No Detail found")
  // }
  return result;

}
directorsFunction.deleteById = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`delete from director where id = $1`, [id]);
    //  let result = await runQuery(`delete from director where id = $1`, [id]);
    // let result = await runQuery(`delete from director where id = ${id}`);
    //   if (result.rowCount != 0) {
    //     console.log("Director Details Deleted")
    //   } else {
    //     console.log("No Detail found")
    //   }
    return result;
  } catch (err) {
    return err;

  }


}
directorsFunction.updateById = async (id, directorName) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`update director set director_name = $2   where id = $1`, [id, directorName]);
    // let result = await runQuery(`update director set director_name = $2   where id = $1`, [id, directorName]);
    // if (result.rowCount != 0) {
    //   console.log("Director Details Updated")
    // } else {
    //   console.log("No Detail Updated")
    // }
    return result;
  }
  catch (error) {
    return error;
  }

}




module.exports = directorsFunction;
