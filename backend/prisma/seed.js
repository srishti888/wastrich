// # seeds quest library
require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../src/db/prismaClient');

async function seedUser() {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL,
      password,
      preferences: { create: {} },
    },
  });
}

async function seedQuests() {
  const count = await prisma.questLibraryItem.count();
  if (count > 0) return;
  await prisma.questLibraryItem.createMany({
    data: [
      { name: 'Sketch something nearby', category: 'drawing' },
      { name: 'Freewrite for 5 minutes', category: 'writing' },
      { name: 'Fold an origami crane', category: 'craft' },
      { name: 'Write a short poem', category: 'writing' },
      { name: 'Doodle a pattern', category: 'drawing' },
      { name: 'Solve a puzzle', category: 'game' },
      { name: 'Knit or crochet a few rows', category: 'craft' },
      { name: 'Build something with blocks', category: 'craft' },
      { name: 'Play a hand-focused mini-game', category: 'game' },
      { name: 'Color a page', category: 'drawing' },
      { name: 'Write a letter to yourself', category: 'writing' },
      { name: 'Fidget toy routine', category: 'game' },
    ],
  });
}

async function main() {
  await seedUser();
  await seedQuests();
}

main().then(() => prisma.$disconnect());