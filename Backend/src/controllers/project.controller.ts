import { Response, NextFunction } from 'express';
import * as projectService from '../services/project.service';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { CreateProjectDto, CreateProjectResponseDto, ProjectMetaResponseDto, ProjectResponseDto, DailyRequestStat, DashboardStatsResponseDto } from '../interfaces/project.interface';
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

    if (!name || name.trim().length < 3 || name.trim().length > 15) {
      const error = new Error('Project name must be between 3 and 15 characters');
      (error as any).statusCode = 400;
      throw error;
    }

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

export const getProjectUsers = async (
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

    const projectId = req.params.projectId as string;

    if (!projectId) {
      const error = new Error('Project ID is missing');
      (error as any).statusCode = 400;
      throw error;
    }

    const projectUsers = await projectService.getProjectUsers(userId, projectId);

    res.status(200).json({
      success: true,
      message: 'Project users retrieved successfully',
      data: projectUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectLogs = async (
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

    const logs = await projectService.getProjectLogs(userId as string, projectId as string);

    res.status(200).json({
      success: true,
      message: 'Project logs retrieved successfully',
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (
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

    const dashboardStats: DashboardStatsResponseDto = await projectService.getDashboardStats(userId as string);

    res.status(200).json({
      success: true,
      message: 'Dashboard stats retrieved successfully',
      data: dashboardStats,
    });
  } catch (error) {
    next(error);
  }
};