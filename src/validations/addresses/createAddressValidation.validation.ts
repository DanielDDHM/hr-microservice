import * as z from 'zod';

export const createAddressValidation = z.object({
    zipcode: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    streetName: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    number: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    neighborhood: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    state: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    country: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    reference: z
        .string()
        .optional(),
    city: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
    employeeId: z
        .string()
        .nonempty({ message: 'NON_EMPTY' }),
}).strict();
