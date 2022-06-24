import * as z from 'zod';

export const updateDepartmentTeamValidation = z.object({
    id: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    title: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    description: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    departmentId: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
}).strict(); 