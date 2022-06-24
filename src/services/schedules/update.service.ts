import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { ScheduleDTO } from '~/typings';
import { updateScheduleValidation } from '~/validations';
import genericService from '../generic';
import getObjectByIdService from '../generic/getById.service';

const updateScheduleService = async (dto: ScheduleDTO) => {
    try {
        const {
            id,
            day,
            start,
            end,
            employeeId
        } = updateScheduleValidation.parse(dto);

        const employeeExists = await getObjectByIdService(
            {
                id: employeeId,
                deleted: false
            },
            'employee'
        );

        if (!employeeExists) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND);
        };

        const schedule = await genericService.update(id, {
            day,
            start,
            end,
            employeeId
        }, 'schedule');

        return schedule;
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

export default updateScheduleService
