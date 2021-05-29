const express = require('express');
const router = express.Router();

const clubsController = require('./controllers/clubsController');

router.get('/allClubs', clubsController.allClubs);

module.exports = router;