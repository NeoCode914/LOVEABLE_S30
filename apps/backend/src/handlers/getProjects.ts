import type { Request, Response } from "express";
import { prisma } from "@repo/db";

export const getProjects = async(req: Request, res: Response) => {
  const userId = req.userId;
  
  const allProjects = await prisma.projects.findMany({
    where: {
      userId
    }
  });

  if (!allProjects[0]) {
    return res.status(403).json({
      message: "No projects found create new project"
    });
  }

  res.status(200).json({
    message: "Projects fetched successfully",
    allProjects
  });
  
} 

export const getProjectsById = async(req: Request, res: Response) => {
  const userId = req.userId;
  
  // const projectId = req.params.projectId  // skeptical:String is a wrapper and string is primitive what is that?? It bypasses typescript check .. what other solution are there for this
  // error faced - Type 'string | string[] | undefined' is not assignable to type 'string'.
  //   Type 'undefined' is not assignable to type 'string'.

  const projectId = req.params.projectId as string;
  const project = await prisma.projects.findUnique({
    where: {
      id_userId: {
        id : projectId,
        userId
      }
    }
  });

  if (!project) {
    return res.status(403).json({
      message : "project not found"
    })
  }

  res.status(200).json({
    message: "Project fetched successfully",
    project
  });
  
} 