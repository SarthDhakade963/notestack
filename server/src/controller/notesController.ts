import prisma from "../config/prismaClient";
import { Request, Response } from "express";

interface CreateNotes {
  title: string;
  content: string;
}

export const createNote = async (
  req: Request<{}, {}, CreateNotes>,
  res: Response
): Promise<Response> => {
  try {
    const { title, content } = req.body;

    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return res
      .status(201)
      .json({ message: "Notes created successfully", note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = (req as any).user.id;
    const { noteId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return res.status(400).json({ message: "Note does not exists" });
    }

    if (note.userId !== userId)
      return res.status(403).json({ message: "Not authorized" });

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { title, content },
    });

    return res
      .status(202)
      .json({ message: "Notes updated successfully", updatedNote });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { noteId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return res.status(400).json({ message: "Note does not exists" });
    }

    if (note.userId !== userId)
      return res.status(403).json({ message: "Not authorized" });

    await prisma.note.delete({ where: { id: noteId } });

    return res.status(200).json({ message: "Delete note successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const totalNotes = await prisma.note.count({
      where: { userId },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const thisWeek = await prisma.note.count({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    const lastUpdatedNote = await prisma.note.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    });

    return res.status(200).json({
      totalNotes,
      thisWeek,
      lastUpdated: lastUpdatedNote?.updatedAt || null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
