import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from '../middlewares/authentication';

// Initialize prisma client
const prisma = new PrismaClient();

// Register
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const pictureFile = req.files ? req.files.picture : null;

    const hashedPassword = await hashPassword(password);

    let picBase64 = null;

    if (Array.isArray(pictureFile)) {
      // Handle the case when multiple files are uploaded
      return res
        .status(400)
        .json({ error: 'Only one picture file is allowed' });
    }

    if (pictureFile) {
      const fileData = pictureFile.data;
      picBase64 = fileData.toString('base64');
    } else {
      // If no picture is uploaded, use the default picture
      const readFile = require('fs').readFileSync(
        '../client/src/assets/profile_picture.jpg'
      );
      picBase64 = readFile.toString('base64');
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        picture: picBase64,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const name = user.name as string;

    const token = generateToken(user.id, name);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Verify token
export async function verify(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const tokenAuth = authHeader.slice(7); // Remove the "Bearer " prefix
    let decodedToken;

    try {
      decodedToken = verifyToken(tokenAuth);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (decodedToken) {
      res.status(200).json(decodedToken);
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
