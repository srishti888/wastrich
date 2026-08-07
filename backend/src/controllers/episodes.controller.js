const prisma = require('../db/prismaClient');

async function listEpisodes(req, res) {
  const episodes = await prisma.episodeLog.findMany({
    where: { userId: req.user.userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(episodes);
}

async function createEpisode(req, res) {
  const { targetArea, triggerTag, emotionTag, locationTag, isBlip } = req.body;
  const episode = await prisma.episodeLog.create({
    data: { userId: req.user.userId, targetArea, triggerTag, emotionTag, locationTag, isBlip: !!isBlip },
  });
  res.status(201).json(episode);
}

module.exports = { listEpisodes, createEpisode };