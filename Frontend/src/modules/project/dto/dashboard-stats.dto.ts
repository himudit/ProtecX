export interface DailyRequestStat {
    date: string;
    count: number;
}

export interface DashboardStatsResponseDto {
    totalProjects: number;
    totalUsers: number;
    totalRequests: number;
    dailyRequestStats: DailyRequestStat[];
}
