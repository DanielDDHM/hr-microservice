import * as z from 'zod';

import { PaycheckHistoryDTO } from '../../typings'
import { createPaycheckHistoryValidation } from '../../validations/paycheckHistory/createPaycheckHistory.validations';
import genericService from '../generic';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';

const createPaycheckHistoryService = async (dto: PaycheckHistoryDTO) => {
    try {
        
        const { title, value, walletAddress, employeeId } = createPaycheckHistoryValidation.parse(dto);

        const employeeExist = await genericService.getById( 
            {id:employeeId,deleted:false},
             'employee')

        if (!employeeExist) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND)
        }

        const paycheckHistory = await  genericService.create({
            title, 
            value,
            walletAddress,
            employeeId
        }, 'paycheckHistory');

        return paycheckHistory
    
    } catch (error:any) {
        if (error instanceof z.ZodError) {
            throw new AppError(parseZodErrors(error), StatusCode.BAD_REQUEST);
        }
        if (error instanceof AppError) {
            throw new AppError(error.messages, error.statusCode);
        }
        throw new AppError(error?.message, StatusCode.INTERNAL_SERVER_ERROR);
    }


}

export default createPaycheckHistoryService 