import * as z from 'zod';

export const createPaycheckHistoryValidation = z.object({
  title: z.string().nonempty({ message: 'NON_EMPTY' }),
  value: z.string().nonempty({ message: 'NON_EMPTY' }),
  walletAddress: z.string().nonempty({ message: 'NON_EMPTY' }),
  employeeId: z.string().nonempty({ message: 'NON_EMPTY' }),
});