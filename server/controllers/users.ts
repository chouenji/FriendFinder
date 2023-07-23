import { Router, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

// Initialize a new Prisma client
const prisma = new PrismaClient();

// Initialize a new router
export const router = Router();

export async function users(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function user(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function postUserDescription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      console.error(user);
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { description },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function postUserLikes(req: Request, res: Response) {
  try {
    const { userId, likedUserId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const likedUser = await prisma.user.findUnique({
      where: { id: Number(likedUserId) },
    });

    if (!likedUser) {
      return res.status(404).json({ error: 'Liked user not found' });
    }

    const like = await prisma.likeUser.findFirst({
      where: {
        userId: Number(userId),
        likedId: Number(likedUserId),
      },
    });

    if (like) {
      return res.status(400).json({ error: 'User already liked' });
    }

    const newLike = await prisma.likeUser.create({
      data: {
        userId: Number(userId),
        likedId: Number(likedUserId),
      },
    });

    const checkMatch = await prisma.likeUser.findFirst({
      where: {
        userId: Number(likedUserId),
        likedId: Number(userId),
      },
    });

    if (checkMatch) {
      await prisma.match.create({
        data: {
          userId: Number(userId),
          matchedId: Number(likedUserId),
        },
      });

      await prisma.match.create({
        data: {
          userId: Number(likedUserId),
          matchedId: Number(userId),
        },
      });
    }

    res.status(200).json(newLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getUserLikes(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const likes = await prisma.likeUser.findMany({
      where: { userId: Number(id) },
    });

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getUserMatches(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const matches = await prisma.match.findMany({
      where: { userId: Number(id) },
    });

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
