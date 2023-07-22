
import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();





/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) return json({ error: 'Missing fields' }, 400);

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, 
      },
    });

    return json(user);
  } catch (error) {
    console.error(error);
    return json({ error: 'Something went wrong' }, 500);
  }
}



async function hashPassword(password) {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}