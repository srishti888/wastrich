const prisma = require('../db/prismaClient');

async function getPreferences(req, res) {
  const prefs = await prisma.userPreferences.findUnique({ where: { userId: req.user.userId } });
  res.json(prefs);
}

async function updatePreferences(req, res) {
  const { trackEmotion, trackLocation, trackTrigger } = req.body;
  const prefs = await prisma.userPreferences.update({
    where: { userId: req.user.userId },
    data: { trackEmotion, trackLocation, trackTrigger },
  });
  res.json(prefs);
}

module.exports = { getPreferences, updatePreferences };