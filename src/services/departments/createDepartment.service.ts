import * as z from 'zod';

import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import prisma  from '~/services/prisma';
import { DepartmentDTO } from '~/typings'
import { createDepartmentValidation } from '~/validations';
import genericService from '../generic';

const createDepartmentService = async (dto: DepartmentDTO) => {
    try {
        const { description, title } = createDepartmentValidation.parse(dto);
        
        const departmentExist = await prisma.department.findFirst({ where:{ title }});

        if (departmentExist) {
            throw new AppError(['DEPARTMENT_ALREADY_EXISTS'], StatusCode.BAD_REQUEST);
        }

        const department = await genericService.create({
            description,
            title
        }, 'department');

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

export default createDepartmentService