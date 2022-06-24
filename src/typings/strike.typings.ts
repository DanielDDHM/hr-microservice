import { DefaultSchema } from './default.typings';

export interface Strike extends DefaultSchema {
    title: string
    description: string
    employeeId: string
}

export type StrikeDTO = Omit<Strike,
    'id' |
    'createdAt' |
    'updatedAt' |
    'deleted' |
    'deletedAt'
>;