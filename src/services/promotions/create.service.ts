import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import genericService from '../generic';
import { createPromotionValidation } from '../../validations/promotions/createPromotion.validation';
import { PromotionDTO } from '../../typings/promotion.typings';
import generic from '../generic';

const createPromotionService = async (dto: PromotionDTO) => {
    try {
        const {
            title,
            description,
            allowedBy,
            currentSalary,
            newSalary,
            employeeId           
        } = createPromotionValidation.parse(dto);


        const employeeExist = await generic.getById({
            id: employeeId,
            deleted: false
        }, 'employee');

        if (!employeeExist) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND);
        }

        const promotion = await genericService.create({
            title,
            description,
            allowedBy,
            currentSalary,  
            newSalary,
            employeeId  
        }, 'promotion');

        return promotion;
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

export default createPromotionService