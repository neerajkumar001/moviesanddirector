const bodyparser = require('body-parser');
const movie = require('../models/movies');
const joi = require('joi');
const { movie_validation } = require('../validation');

var express = require('express');
var router = express.Router();
// router.set('json spaces', 40);
// Home page route
router.use(bodyparser.json());
router.get('/', async function (req, res) {
  const result = await movie.getAll();
  if (result === '500') {
    res.status(500).send('Internal Server Error')
  }
  else {
    if (result.rowCount != 0) {
      res.send(result.rows);
    } else {
      res.status(404).send('Empty')
    }
  }

});
router.get('/:id', async function (req, res) {
  const { error } = joi.validate(req.params, movie_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await movie.getById(req.params.id);

    if (result.rowCount != 0) {
      res.send(result.rows);
    } else {
      res.status(404).send('movie Not Found')
    }
  }

});
router.post('/', async function (req, res) {
  const { error } = joi.validate(req.body, movie_validation.body);

  if (error) {
    res.status(400).json(error);
  } else {
    const movieDetail = Object.values(req.body);
    const result = await movie.insertData(movieDetail);

    if (result.rowCount != 0) {
      res.status(200).send('movie Detail Inserted');
    }
    else {
      res.send('movie Detail not found');

    }
  }

});

router.delete('/:id', async function (req, res) {
  const { error } = joi.validate(req.params, movie_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await movie.deleteById(req.params.id);

    if (result.rowCount != 0) {
      res.send('movie deleted');
    }
    else {
      res.status(404).send('movie not found');
    }
  }

});
router.put('/:id', async function (req, res) {


  req.body.rank_id = req.params.id;

  const { error } = joi.validate(req.body, movie_validation.body);

  if (error) {
    res.status(400).json(error);
  } else {
    // console.log(Object.values(req.body))
    delete req.body.rank_id;
    const result = await movie.updateById(req.params.id, Object.values(req.body));
    console.log("hii");
    if (result.rowCount != 0) {
      res.status(200).send('movie Name Updated');
    }
    else {
      res.send('movie ID not found');
    }
  }



});

module.exports = router;
