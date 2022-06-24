import * as z from 'zod';

export const updateEmployeeValidation = z.object({
    id: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    fullName: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    groupId: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    birthDate: z
        .string(),
    admittedAt: z
        .string(),
    dismissedAt: z
        .string().optional(),
    capU: z
        .string(),
    role: z
        .string(),
    mainWalletAddress: z
        .string().optional(),
}).strict();