import * as z from 'zod';

export const getAllValidation = z.object({
    page: z.number().nonnegative({ message: 'NON_NEGATIVE' }).int({ message: 'MUST_BE_INTEGER' }),
    perPage: z.number().nonnegative({ message: 'NON_NEGATIVE' }).int({ message: 'MUST_BE_INTEGER' }),
}).strict();
