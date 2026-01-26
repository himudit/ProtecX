import { Response, NextFunction } from 'express';
import * as projectService from '../services/project.service';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { CreateProjectDto } from '../interfaces/project.interface';

export const createProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      const error = new Error('User ID is missing');
      (error as any).statusCode = 401;
      throw error;
    }

    const { name, description } = req.body;

    const project = await projectService.createProject(userId, { name, description });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

