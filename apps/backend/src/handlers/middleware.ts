import { prisma } from "@repo/db";
import type { NextFunction, Request, Response } from "express";

export const middleware = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const user = await prisma.user.findFirst({
    where: {
      id: token
    }
  });
  if (!user) {
    return res.status(403).json({
      message : "User not found"
    })
  }
  req.userId = user.id
  next()
} 