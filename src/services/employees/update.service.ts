import * as z from 'zod';

import prisma from '../../services/prisma';
import AppError from '../../exceptions/appError.exception';
import StatusCode from '../../helpers/statusCode';
import parseZodErrors from '../../helpers/parseZodErrors';
import genericService from '../generic';
import {
    updateEmployeeValidation
} from '../../validations';
import {
    EmployeeDTO
} from '../../typings';

const updateEmployeeService = async (dto: EmployeeDTO) => {
    try {
        const {
            id,
            fullName,
            birthDate,
            admittedAt,
            dismissedAt,
            capU,
            role,
            mainWalletAddress,
            groupId,
        } = updateEmployeeValidation.parse(dto);
        
        const departmentGroupExist = await genericService.getById(
        {   id: groupId,
            deleted:false
        },
            'departmentGroup'
        );

        if (!departmentGroupExist) {
            throw new AppError(['DEPARTMENT_GROUP_NOT_FOUND'], StatusCode.NOT_FOUND);
        };

        if (!!capU) {
             const capUExists = await prisma.employee.findFirst({
                  where: {
                     capU : capU 
                    }
             });      
            if (capUExists) {
            throw new AppError(['CAP_U_ALREADY_EXISTS'], StatusCode.BAD_REQUEST) 
        } 
    }

        const employee = await genericService.update(id, {
            fullName,
            birthDate,
            admittedAt,
            dismissedAt,
            capU,
            role,
            mainWalletAddress,
            groupId,
        }, 'employee');

        return employee;
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

export default updateEmployeeService 