import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { ContactDTO } from '~/typings'
import { updateContactValidation } from '~/validations';
import genericService from '../generic';
import prisma from '~/services/prisma';

const updateContactservice = async (dto: ContactDTO) => {
    try {
        const {
            label,
            value,
            employeeId,
            id
        } = updateContactValidation.parse(dto);

        const employeeExists = await genericService.getById(
            {
                id: employeeId,
                deleted: false
            },
            'employee'
        );

        if (!employeeExists) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND);
        };

        const contactExists = await prisma.contact.findFirst({
            where: {
                value,
                deleted: false
            }
        });

        if (contactExists) {
            throw new AppError(['CONTACT_VALUE_ALREADY_EXISTS'], StatusCode.BAD_REQUEST);
        }

        const contact = await genericService.update(id, {
            label,
            value,
            employeeId
        }, 'contact');

        return contact;
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

export default updateContactservice