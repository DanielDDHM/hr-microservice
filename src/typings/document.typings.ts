import { 
    Document as PCDocument,
} from "@prisma/client";

export interface Document extends PCDocument {
    document : Document
}

export type DocumentDTO = Pick<Document, 
     'label' | 'value' | 'employeeId'
>;