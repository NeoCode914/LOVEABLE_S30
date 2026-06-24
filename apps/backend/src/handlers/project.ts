import type { Request, Response } from "express";
import { projectSchema } from "../types/types";
import { prisma } from "@repo/db";

export const project = async(req: Request, res: Response) => {
  const userId = req.userId;
  const { success, data, error } = projectSchema.safeParse(req.body);
  
  if (!success) {
    return res.status(403).json({
      message: "incorrect inputs"
    })
  };
  
  const project = await prisma.projects.create({
    data: {
      title: data.title,
      initialPrompt: "hello",
      userId,
      updatedAt : Date.now().toString() //skeptical about this find if this is good or not
    }
  });

  res.status(200).json({
    message: "project created",
    details: {
      projectId: project.id,
      title: project.title
    }
  });
  
} 