const { director } = require('../config/databaseTable')

let directorsFunction = {};
directorsFunction.getAll = async () => {
  try {
    const result = await director.findAll()
    if (result.rowCount != 0) {
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
  const result = await director.findAll({ where: { id: id } });
  return result;
}
directorsFunction.insertData = async (directorName) => {
  try {
    const result = await director.create({ director_name: directorName });
    return result;
  } catch (error) {
    return error;
  }
}
directorsFunction.deleteById = async (id) => {
  try {
    const result = await director.destroy({
      where: {
        id: id
      }
    })
    return result;
  } catch (err) {
    return err;
  }
}
directorsFunction.updateById = async (id, directorName) => {
  try {
    const result = await director.update(
      { director_name: directorName },
      { where: { id: id } }
    )
    return result;
  }
  catch (error) {
    return error;
  }
}




module.exports = directorsFunction;
