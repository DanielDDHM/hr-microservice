import * as z from 'zod';

import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import prisma from '~/services/prisma';
import {
    AvailableModelsNames, DepartmentDTO, DepartmentTeamDTO,
    DepartmentGroupDTO, EmployeeDTO, DocumentDTO, AddressDTO,
    PromotionDTO, ContactDTO, StrikeDTO, PaycheckHistoryDTO, ScheduleDTO
} from '~/typings'

const createService = async (
    dto: DepartmentDTO | DepartmentTeamDTO |
        DepartmentGroupDTO | EmployeeDTO | DocumentDTO |
        ContactDTO | PromotionDTO | AddressDTO | StrikeDTO | PaycheckHistoryDTO | ScheduleDTO,
    model: AvailableModelsNames) => {

    try {
        const department = await prisma[model as string].create({
            data: {
                ...dto,
                deleted: false
            }
        });

        return department;
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

export default createService;