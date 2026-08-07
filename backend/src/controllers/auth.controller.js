const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db/prismaClient');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}

module.exports = { login };