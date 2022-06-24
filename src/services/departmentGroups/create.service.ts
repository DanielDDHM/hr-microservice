import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { DepartmentGroupDTO } from '~/typings'
import { createDepartmentGroupValidation } from '~/validations';
import genericService from '../generic';
import prisma  from '~/services/prisma';

const createDepartmentGroupService = async (dto: DepartmentGroupDTO) => {
    try {
        
        const { 
            description, 
            title,
            teamId,
        } = createDepartmentGroupValidation.parse(dto);

        const departmentTeamExist = await genericService.getById(
            {
                id: teamId,
                deleted: false
            },
            'departmentTeam'
        );

        if (!departmentTeamExist) {
            throw new AppError(['TEAM_NOT_FOUND'], StatusCode.NOT_FOUND);
        };

        const departmentGroupExist = await prisma.departmentGroup.findFirst({ 
            where: { 
               title,
               deleted: false
            }
        });

        if (departmentGroupExist) {
            throw new AppError(['DEPARTMENT_GROUP_ALREADY_EXIST'], StatusCode.BAD_REQUEST);
        }   

        const departmentGroup = await genericService.create({
            description,
            title,
            teamId,
        }, 'departmentGroup');

        return departmentGroup;
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

export default createDepartmentGroupService 
