const prisma = require('../db/prismaClient');

async function listSessions(req, res) {
  const sessions = await prisma.clockInSession.findMany({
    where: { userId: req.user.userId },
    include: { quest: true },
    orderBy: { startedAt: 'desc' },
  });
  res.json(sessions);
}

async function createSession(req, res) {
  const { questId, durationMin, engaged, interrupted } = req.body;
  const session = await prisma.clockInSession.create({
    data: {
      userId: req.user.userId,
      questId,
      durationMin,
      engaged: engaged ?? null,
      interrupted: !!interrupted,
    },
    include: {
      quest: true,
    },
  });
  res.status(201).json(session);
}

module.exports = { listSessions, createSession };