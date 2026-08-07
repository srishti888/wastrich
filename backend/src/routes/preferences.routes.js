const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const { getPreferences, updatePreferences } = require('../controllers/preferences.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', getPreferences);
router.put('/', updatePreferences);

module.exports = router;
