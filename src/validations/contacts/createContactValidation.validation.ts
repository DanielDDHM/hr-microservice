import * as z from 'zod';

export const createContactValidation = z.object({
    label: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    value: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    employeeId: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
}).strict();
