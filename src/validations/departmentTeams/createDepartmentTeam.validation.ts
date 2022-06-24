import * as z from 'zod';

export const createDepartmentTeamValidation = z.object({
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
