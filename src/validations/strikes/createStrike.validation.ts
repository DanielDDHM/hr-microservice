import * as z from 'zod';

export const createStrikeValidation = z.object({
    title: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    description: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    employeeId: z
        .string()
        .nonempty({ message: "NON_EMPTY"}),
}).strict();