import { 
    DepartmentTeam as PCDepartmentTeam,
} from "@prisma/client";

import { Department } from "./department.typings";

export interface DepartmentTeam extends PCDepartmentTeam {
    department: Department
}

export interface GetAllDepartmentTeamFilters {
    description?: String,
    title?: String,
    departmentId?: String
}
export type DepartmentTeamDTO = Pick<DepartmentTeam, 
    'title' | 'description' | 'departmentId'
>;