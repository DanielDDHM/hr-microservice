import * as z from 'zod';

export const createPromotionValidation = z.object({
    title: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    description: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    allowedBy: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    currentSalary: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    newSalary: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    employeeId: z
        .string()
        .nonempty({ message: "NON_EMPTY"}),
}).strict();