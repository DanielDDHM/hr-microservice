import * as z from 'zod';

export const createEmployeeValidation = z.object({
  fullName: z.string().min(2, { message: 'MIN_LENGHT_3' }),
  groupId: z.string(),
  birthDate: z.string(),
  admittedAt: z.string(),
  dismissedAt: z.string().optional(),
  capU: z.string().optional(),
  role: z.string(),
  mainWalletAddress: z.string().optional(),
});