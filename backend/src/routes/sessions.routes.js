const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const { listSessions, createSession } = require('../controllers/sessions.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', listSessions);
router.post('/', createSession);

module.exports = router;