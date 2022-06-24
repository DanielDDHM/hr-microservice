import * as z from 'zod';

export const createScheduleValidation = z.object({
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