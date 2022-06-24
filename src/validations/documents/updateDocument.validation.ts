import * as z from 'zod';

export const updateDocumentValidation = z.object({
    id: z
    .string()
    .nonempty({ message: 'NON_EMPTY' }),
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
