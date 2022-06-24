import * as z from 'zod';

import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import prisma from '~/services/prisma';
import {
    AvailableModelsNames, DepartmentDTO, DepartmentGroupDTO,
    DepartmentTeamDTO, DocumentDTO, EmployeeDTO, AddressDTO,
    ContactDTO, ScheduleDTO
} from '~/typings'

const updateService = async (
    id: string,
    dto: DepartmentDTO | DepartmentTeamDTO | DepartmentGroupDTO |
        EmployeeDTO | DocumentDTO | ContactDTO |
        AddressDTO | ScheduleDTO,
    model: AvailableModelsNames) => {
    try {
        return await prisma[model as string].update({
            where: {
                id
            },
            data: {
                ...dto,
                updatedAt: new Date(),
            }
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            throw new AppError(parseZodErrors(error), StatusCode.BAD_REQUEST);
        }
        if (error instanceof AppError) {
            throw new AppError(error.messages, error.statusCode);
        }
        throw new AppError(error?.message, StatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default updateService;