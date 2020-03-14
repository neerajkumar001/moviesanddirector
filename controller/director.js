const bodyparser = require('body-parser');
const director = require('../models/director');

var express = require('express');
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
  const result = await director.getById(req.params.id);

  if (result.rowCount != 0) {
    res.send(result.rows);
  } else {
    res.status(404).send('Director Not Found')
  }

});
router.post('/', async function (req, res) {
  const result = await director.insertData(req.body.director_name);

  if (result.rowCount != 0) {
    res.status(200).send('Director Detail Inserted');
  }
  else {
    res.send('Director Detail not found');

  }

});

router.delete('/:id', async function (req, res) {
  const result = await director.deleteById(req.params.id);

  if (result.rowCount != 0) {
    res.send('Director deleted');
  }
  else {
    res.status(404).send('Director not found');
  }

});
router.put('/:id', async function (req, res) {
  const result = await director.updateById(req.params.id, req.body.dirname);

  if (result.rowCount != 0) {
    res.status(200).send('Director Name Updated');
  }
  else {
    res.send('Director ID not found');
  }



});

module.exports = router;
