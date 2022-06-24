export interface DefaultSchema {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    deleted: boolean,
    deletedAt: Date,
}

export interface GetAllPaginate {
    page: number;
    perPage: number;
}

export type AvailableModelsNames = 'department' |
    'departmentTeam' |
    'departmentGroup' |
    'employee' |
    'contact' |
    'document' |
    'paycheckHistory' |
    'strike' |
    'schedule' |
    'promotion' |
    'address'