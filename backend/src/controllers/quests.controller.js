const prisma = require('../db/prismaClient');

async function listQuests(req, res) {
  res.json(await prisma.questLibraryItem.findMany());
}

module.exports = { listQuests };
