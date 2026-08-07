const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const { listEpisodes, createEpisode, getStats } = require('../controllers/episodes.controller');

const router = express.Router();
router.use(requireAuth);
router.get('/stats', getStats);
router.get('/', listEpisodes);
router.post('/', createEpisode);
module.exports = router;