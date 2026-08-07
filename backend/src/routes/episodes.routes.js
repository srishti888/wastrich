const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const { listEpisodes, createEpisode } = require('../controllers/episodes.controller');

const router = express.Router();
router.get('/stats', getStats);
router.use(requireAuth);
router.get('/', listEpisodes);
router.post('/', createEpisode);
module.exports = router;