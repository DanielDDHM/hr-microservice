import { DefaultSchema } from './default.typings';

export interface PaycheckHistory extends DefaultSchema {
    title: string,
    value: string,
    walletAddress: string,
    employeeId: string
}

export type PaycheckHistoryDTO = Omit<PaycheckHistory,
    'id' |
    'createdAt' |
    'updatedAt' |
    'deleted' |
    'deletedAt'
>;