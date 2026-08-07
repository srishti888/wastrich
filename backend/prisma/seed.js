// # seeds quest library
require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../src/db/prismaClient');

async function main() {
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

main().then(() => prisma.$disconnect());