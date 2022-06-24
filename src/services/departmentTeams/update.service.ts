import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { DepartmentTeamDTO } from '~/typings'
import { updateDepartmentTeamValidation } from '~/validations';
import genericService from '../generic';
import prisma  from '~/services/prisma';


const updateDepartmentTeamService = async (dto: DepartmentTeamDTO) => {
    try {

        const {
            description,
            departmentId,
            title,
            id
        } = updateDepartmentTeamValidation.parse(dto);

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

        const departmentTeam = await genericService.update(id, {
            description,
            title,
            departmentId
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

export default updateDepartmentTeamService  