const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/gameController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

router.post('/score', authMiddlewares, GameController.addScore);

router.get('/leaderboard/:timeFrame', authMiddlewares, GameController.getLeaderboard);

module.exports = router;