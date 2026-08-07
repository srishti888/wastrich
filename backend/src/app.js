require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const episodesRoutes = require('./routes/episodes.routes');
const sessionsRoutes = require('./routes/sessions.routes');
const preferencesRoutes = require('./routes/preferences.routes');
const questsRoutes = require('./routes/quests.routes');

const app = express();
app.use(cors());
app.use(express.json());

//comment out later when we have a frontend to serve
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/episodes', episodesRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/quests', questsRoutes);

module.exports = app;