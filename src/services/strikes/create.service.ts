import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { StrikeDTO } from '~/typings';
import { createStrikeValidation } from '~/validations';
import genericService from '../generic';

const createStrikeService = async (dto: StrikeDTO) => {
    try {
        const {
            description,
            employeeId,
            title
        } = createStrikeValidation.parse(dto);

        const employeeExists = await genericService.getById({id: employeeId, deleted:false},'employee')

        if (!employeeExists) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND);
        }

        const strike = await genericService.create({
            description,
            employeeId,
            title
        }, 'strike');

        return strike;
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

export default createStrikeService