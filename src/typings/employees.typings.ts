import { DefaultSchema } from './default.typings';

export interface Employee extends DefaultSchema {
    fullName: string,
    birthDate: string,
    admittedAt: string,
    dismissedAt?: string,
    capU?: string,
    role: string,
    mainWalletAddress?: string,
    groupId: string,
}

export interface GetAllEmployeesFilters {
    fullName?: string;
    birthDate?: string;
    admittedAt?: string;
    dismissedAt?: string;
    role?: string;
    deleted?: boolean;
    groupId?: string;
}

export type EmployeeDTO = Omit<Employee,
    'id' |
    'createdAt' |
    'updatedAt' |
    'deleted' |
    'deletedAt'
>;