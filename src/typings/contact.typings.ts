import {
    Contact as PCContact,
} from "@prisma/client";

export interface Contact extends PCContact {
    contact: Contact
}

export type ContactDTO = Pick<Contact,
    'label' | 'value' | 'employeeId'
>;