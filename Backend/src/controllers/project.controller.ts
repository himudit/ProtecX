import { Response, NextFunction } from 'express';
import * as projectService from '../services/project.service';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { CreateProjectDto, CreateProjectResponseDto, ProjectMetaResponseDto, ProjectResponseDto } from '../interfaces/project.interface';
import { ApiResponse } from '../interfaces/api-request.interface';

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

    const projectResponseDto: CreateProjectResponseDto = await projectService.createProject(userId, { name, description });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: projectResponseDto,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (
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

    const projectsResponseDto: ProjectResponseDto[] = await projectService.getProjects(userId);

    const response: ApiResponse<ProjectResponseDto[]> = {
      success: true,
      message: 'Projects retrieved successfully',
      data: projectsResponseDto,
    };
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
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

    const projectId = req.params.projectId;

    if (!projectId) {
      const error = new Error('Project ID is missing');
      (error as any).statusCode = 400;
      throw error;
    }

    const project: ProjectMetaResponseDto = await projectService.getProjectById(userId as string, projectId as string);

    const response: ApiResponse<ProjectMetaResponseDto> = {
      success: true,
      message: 'Project retrieved successfully',
      data: project,
    };
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};
