// Import necessary modules
import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middlewares/authentication';

const prisma = new PrismaClient();

// Initialize express app
const app = express();

// Initialize socket.io
const io = new Server(3000, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const tokenAuth = authHeader.slice(7); // Remove the "Bearer " prefix

    const decodedToken = verifyToken(tokenAuth);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decodedToken.userId;

    const chat = await prisma.chat.findMany({
      where: {
        OR: [
          {
            userId: parseInt(userId),
          },
          {
            matchedId: parseInt(userId),
          },
        ],
      },
      include: {
        message: true,
      },
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.status(200).json([chat]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/:id', async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const tokenAuth = authHeader.slice(7); // Remove the "Bearer " prefix

    const decodedToken = verifyToken(tokenAuth);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decodedToken.userId;

    const chat = await prisma.chat.findMany({
      where: {
        OR: [
          {
            userId: parseInt(userId),
            matchedId: parseInt(id),
          },
          {
            userId: parseInt(id),
            matchedId: parseInt(userId),
          },
        ],
      },
      include: {
        message: true,
      },
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, matchedId, message } = req.body;

    // Save the message to the database
    await prisma.chat.create({
      data: {
        userId: userId,
        matchedId: matchedId,
        message: {
          create: {
            message: message,
            senderId: userId,
            matchedId: matchedId,
          },
        },
      },
    });

    res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, matchedId, message } = req.body;

    // Save the message to the database
    await prisma.chat.update({
      where: {
        id: parseInt(id),
      },
      data: {
        message: {
          create: {
            message: message,
            senderId: userId,
            matchedId: matchedId,
          },
        },
      },
    });

    res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export { app };
