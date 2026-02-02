import type { ProjectRole } from "@/enums/enum"

export interface ProjectUserRowResponseDto {
    id: string;
    name: string;
    email: string;
    role: ProjectRole;
    isVerified: boolean;
    createdAt: string;
    lastLoginAt: string;
}
