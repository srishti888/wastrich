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

async function getStats(req, res) {
  const episodes = await prisma.episodeLog.findMany({
    where: { userId: req.user.userId },
    select: { createdAt: true, isBlip: true },
  });

  const trendMap = {};
  const hourly = Array(24).fill(0);

  for (const ep of episodes) {
    const date = ep.createdAt.toISOString().slice(0, 10);
    trendMap[date] = (trendMap[date] || 0) + 1;
    hourly[ep.createdAt.getHours()] += 1;
  }

  const trend = Object.entries(trendMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  res.json({ trend, hourly, blipCount: episodes.filter((e) => e.isBlip).length, totalCount: episodes.length });
}

module.exports = { listEpisodes, createEpisode, getStats };