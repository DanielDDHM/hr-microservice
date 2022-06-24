import * as z from 'zod';

export const updateDepartmentGroupValidation = z.object({
    id: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
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