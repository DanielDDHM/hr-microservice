import { 
    DepartmentGroup as PCDepartmentGroup,
} from "@prisma/client";

import { Department } from "./department.typings";

export interface DepartmentGroup extends PCDepartmentGroup {
    department: Department
}
export interface GetAllDepartmentGroupFilters {
    description?: String,
    title?: String,
    teamId?: String
}
export type DepartmentGroupDTO = Pick<DepartmentGroup, 
    'title' | 'description' | 'teamId' | 'id'
>;