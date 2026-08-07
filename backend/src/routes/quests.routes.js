const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const { listQuests } = require('../controllers/quests.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', listQuests);

module.exports = router;