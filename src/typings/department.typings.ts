import {
    Department as PCDepartment,
} from "@prisma/client";

import { DepartmentTeam } from './departmentTeam.typings';

export interface Department extends PCDepartment {
    teams: DepartmentTeam[]
}

export interface GetAllDepartmentsFilters {
    title?: string;
    description?: string;
}

export type DepartmentDTO = Pick<Department,
    'title' | 'description'
>;