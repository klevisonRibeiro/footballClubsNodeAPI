const express = require('express');
const router = express.Router();

const clubsController = require('./controllers/clubsController');

router.get('/allClubs', clubsController.allClubs);
router.get('/club/:id', clubsController.getClubById);
router.delete('/club/:id', clubsController.deleteClubById);
router.post('/club', clubsController.insertClub);

module.exports = router;