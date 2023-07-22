
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function compareHashedPasswords(inputPassword, storedPasswordHash) {
  try {
    const isPasswordValid = await bcrypt.compare(inputPassword, storedPasswordHash);
    return isPasswordValid;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
}

export async function POST({ request }) {
  const { email, password } = await request.json();

  if (!email || !password) return json({ error: 'Missing fields' }, 400);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return json({ error: 'Invalid credentials' }, 400);

    const isPasswordValid = await compareHashedPasswords(password, user.password);

    if (!isPasswordValid) return json({ error: 'Invalid credentials' }, 400);

    return json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    return json({ error: 'Something went wrong' }, 500);
  }
}


