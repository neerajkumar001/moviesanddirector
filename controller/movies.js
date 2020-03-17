const bodyparser = require('body-parser');
const movie = require('../models/movies');
const joi = require('joi');
const { movie_validation } = require('../validation/moviesValidation');


var express = require('express');
var router = express.Router();
// router.set('json spaces', 40);
// Home page route
router.use(bodyparser.json());
router.get('/', async function (req, res, next) {
  const result = await movie.getAll();
  // console.log(result.length);
  if (result.length > 0) {
    res.send(result);
  } else if (result.length == 0) {
    res.status(404).json({

      message: "Empty Table"
    })
  } else {
    next(result)
  }


});
router.get('/:id', async function (req, res, next) {
  const { error } = joi.validate(req.params, movie_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await movie.getById(req.params.id);
    console.log(result.length);
    if (Array.isArray(result) && result.length) {
      res.send(result);
    }
    // else if (result.original.name == 'error') {
    //   res.send(result)
    // }
    else if (result.length == 0) {
      res.status(404).json({

        message: "Movie Detail not found"
      })
    }
    else {
      next(result);
    }
  }

});
router.post('/', async function (req, res, next) {
  const { error } = joi.validate(req.body, movie_validation.body);

  if (error) {
    res.status(400).json(error);
  } else {
    // const movieDetail = Object.values(req.body);
    const result = await movie.insertData(req.body);


    if (result.errors) {
      // res.send(result);
      next(result)
    } else if (result) {
      res.status(200).json({ message: 'movie Detail Inserted' });
    }
    else {
      res.json({ message: 'movie Detail not found' });

    }
  }

});

router.delete('/:id', async function (req, res, next) {
  const { error } = joi.validate(req.params, movie_validation.id);

  if (error) {
    res.status(400).json(error);
  }
  else {
    const result = await movie.deleteById(req.params.id);

    if (result != 0) {
      res.json({ message: 'Movie deleted' });
    }
    else if (result == 0) {
      res.status(404).json({ message: 'movie not found' });
    }
    else {
      next(result);
    }
  }

});
router.put('/:id', async function (req, res, next) {


  req.body.rank_id = req.params.id;

  const { error } = joi.validate(req.body, movie_validation.body);

  if (error) {
    res.status(400).json(error);
  } else {
    // console.log(Object.values(req.body))
    delete req.body.rank_id;
    // const result = await movie.updateById(req.params.id, Object.values(req.body));
    const result = await movie.updateById(req.params.id, req.body);
    // console.log(result);

    if (result[0] > 0) {
      res.status(200).json({ message: 'Movie Name Updated' });
    }
    else if (result[0] == 0) {
      res.json({ message: 'Movie id not found' })
    }
    else {
      next(result)
    }
    // if (result.name != 'SequelizeUniqueConstraintError' && result[0] != 0) {
    //   res.status(200).send('movie Name Updated');
    // }
    // else if (result.name == 'SequelizeUniqueConstraintError') {
    //   // res.send('movie Name Must be unique');
    //   next(result);
    // }
    // else {
    //   res.send('movie ID not found');
    // }
  }



});

module.exports = router;
