const bodyparser = require('body-parser');
const director = require('../models/director');
const { director_validation } = require('../validation');
var express = require('express');
const joi = require('joi');
var router = express.Router();
// router.set('json spaces', 40);
// Home page route
router.use(bodyparser.json());
router.get('/', async function (req, res) {
  const result = await director.getAll();
  if (result.rowCount != 0) {
    res.send(result.rows);
  } else {
    res.status(404).send('Empty')
  }


});
router.get('/:id', async function (req, res) {
  const { error } = joi.validate(req.params, director_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await director.getById(req.params.id);

    if (result.rowCount != 0) {
      res.send(result.rows);
    } else {
      res.status(404).send('Director Not Found')
    }
  }

});
router.post('/', async function (req, res) {

  const { error } = joi.validate(req.body, director_validation.name);

  if (error) {
    res.status(400).send(error);
    console.log("hello")
  }
  else {
    const result = await director.insertData(req.body.director_name);

    if (result.rowCount != 0) {
      res.status(200).send('Director Detail Inserted');
    }
    else {
      res.send('Director Detail not found');

    }
  }

});

router.delete('/:id', async function (req, res) {
  const { error } = joi.validate(req.params, director_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await director.deleteById(req.params.id);

    if (result.rowCount != 0) {
      res.send('Director deleted');
    }
    else {
      res.status(404).send('Director not found');
    }
  }

});
router.put('/:id', async function (req, res) {
  let validate_object = req.body;

  validate_object.id = req.params.id;
  const { error } = joi.validate(validate_object, director_validation.update);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await director.updateById(req.params.id, req.body.dirname);

    if (result.rowCount != 0) {
      res.status(200).send('Director Name Updated');
    }
    else {
      res.send('Director ID not found');
    }

  }


});

module.exports = router;
