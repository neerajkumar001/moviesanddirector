const bodyparser = require('body-parser');
const director = require('../models/director');
const { director_validation } = require('../validation/directorValidation');
var express = require('express');
const joi = require('joi');
var router = express.Router();

router.use(bodyparser.json());
router.get('/', async function (req, res, next) {
  const result = await director.getAll();

  if (result.length > 0) {
    res.send(result);
  } else if (result.length == 0) {
    res.status(404).json({ message: 'Empty Table' })
  } else {
    next(result)
  }


});
router.get('/:id', async function (req, res, next) {
  const { error } = joi.validate(req.params, director_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await director.getById(req.params.id);
    if (Array.isArray(result) && result.length) {
      res.send(result);
    }
    else if (result.length == 0) {
      res.status(404).json({ message: 'Director not found' })
    }
    else {
      next(result);
    }
  }

});
router.post('/', async function (req, res, next) {

  const { error } = joi.validate(req.body, director_validation.name);

  if (error) {
    res.status(400).send(error.details);
  }
  else {

    const result = await director.insertData(req.body.director_name);
    if (result.errors) {
      // res.send(result);
      next(result)
    } else if (result) {
      res.status(200).json({ message: 'Director Detail Inserted' });
    }
    else {
      res.json({ message: 'Director Detail not Inserted' });

    }

  }

});

router.delete('/:id', async function (req, res, next) {
  const { error } = joi.validate(req.params, director_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await director.deleteById(req.params.id);

    if (result != 0) {
      res.json({ message: 'Director deleted' });
    }
    else if (result == 0) {
      res.status(404).json({ message: 'Director not found' });
    }
    else {
      next(result);
    }
  }

});
router.put('/:id', async function (req, res, next) {
  let validate_object = req.body;

  validate_object.id = req.params.id;
  const { error } = joi.validate(validate_object, director_validation.update);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await director.updateById(req.params.id, req.body.director_name);


    if (result[0] > 0) {
      res.status(200).json({ message: 'Director Name Updated' });
    }
    else if (result[0] == 0) {
      res.json({ message: 'Director id not found' })
    }
    else {
      next(result)
    }
  }



});

module.exports = router;
