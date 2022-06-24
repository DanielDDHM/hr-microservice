import * as z from 'zod';

import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { DepartmentTeamDTO } from '~/typings'
import { createDepartmentTeamValidation } from '~/validations';
import genericService from '../generic';
import prisma  from '~/services/prisma';

const createDepartmentTeamService = async (dto: DepartmentTeamDTO) => {
    try {
        const { 
            description, 
            title,
            departmentId,
        } = createDepartmentTeamValidation.parse(dto);
        
        const departmentExist = await genericService.getById(
            {
                id: departmentId,
                deleted: false
            },
            'department'
        );

        if (!departmentExist) {
            throw new AppError(['DEPARTMENT_NOT_FOUND'], StatusCode.NOT_FOUND);
        };

        const departmentTeamExist = await prisma.departmentTeam.findFirst({ 
            where: { 
               title,
               deleted: false
            }
        });

        if (departmentTeamExist) {
            throw new AppError(['DEPARTMENT_TEAM_ALREADY_EXIST'], StatusCode.BAD_REQUEST);
        }   

        const departmentTeam = await genericService.create({
            description,
            title,
            departmentId,
        }, 'departmentTeam');

        return departmentTeam;
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

export default createDepartmentTeamService