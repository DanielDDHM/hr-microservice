import * as z from 'zod';

export const createDepartmentValidation = z.object({
  title: z
  .string()
  .nonempty({ message: 'NON_EMPTY' }),
  description: z
    .string()
    .nonempty({ message: 'NON_EMPTY' })
}).strict();
