const express = require('express');
const app = express();
const authRouter = require('./Routes/authRoutes');
const gameRouter = require('./Routes/gameRoutes');

app.use('/snake-game', authRouter);
app.use('/snake-game', gameRouter);

module.exports = app;
