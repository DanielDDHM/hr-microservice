import * as z from 'zod';

export const createDepartmentGroupValidation = z.object({
    title: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    description: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    teamId: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
}).strict();