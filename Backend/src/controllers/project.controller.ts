import { Request, Response, NextFunction } from 'express';
import * as projectService from '../services/project.service';

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await projectService.createProject(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

