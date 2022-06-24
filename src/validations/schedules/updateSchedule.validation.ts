import * as z from 'zod';

export const updateScheduleValidation = z.object({
    id: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    day: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    start: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    end: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    employeeId: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
}).strict();
