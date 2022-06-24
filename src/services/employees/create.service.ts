import * as z from 'zod';

import AppError from '../../exceptions/appError.exception';
import StatusCode from '../../helpers/statusCode';
import parseZodErrors from '../../helpers/parseZodErrors';
import {
    createEmployeeValidation
} from '../../validations';
import {
    EmployeeDTO
} from '../../typings';
import genericService from '../generic';
import  prisma  from '~/services/prisma';

const createEmployeeService = async (dto: EmployeeDTO) => {
    try {
        const object = createEmployeeValidation.parse(dto);

        if (!!object.capU) {
            const employeeExitsByCapU = await prisma.employee.findFirst({
                where: {
                    capU: object.capU,
                    deleted: false
                }
            })

            if (employeeExitsByCapU) {
                throw new AppError(['CAPU_ALREADY_IN_USE'], StatusCode.BAD_REQUEST)    
            }
        }   


        if (!!object.mainWalletAddress) {
            const employeeExitsByMainWallet= await prisma.employee.findFirst({
                where: {
                    mainWalletAddress: object.mainWalletAddress,
                    deleted: false
                }
            });

            if (employeeExitsByMainWallet) {
                throw new AppError(['MAIN_WALLET_ADDRESS_ALREADY_IN_USE'], StatusCode.BAD_REQUEST)    
            }
        }

        const departmentGroupExist = await prisma.departmentGroup.findFirst({
            where: {
                id: object.groupId,
                deleted: false
            }
        })
        

        if (!departmentGroupExist) {
            throw new AppError(['GROUP_ID_INVALID'], StatusCode.BAD_REQUEST)    
        }

        const employee = await genericService.create({
            ...object
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

export default createEmployeeService;