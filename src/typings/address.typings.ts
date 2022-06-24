import { DefaultSchema } from './default.typings';

export interface Address extends DefaultSchema {
    zipcode: String,
    streetName: String
    number: String
    neighborhood: String
    state: String
    country: String
    reference?: String
    city: String
    employeeId: String
}

export type AddressDTO = Omit<Address,
    'id' |
    'createdAt' |
    'updatedAt' |
    'deleted' |
    'deletedAt'
>;