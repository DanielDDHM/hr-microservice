import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import genericService from '../generic';
import { createDocumentValidation } from '../../validations/documents/createDocumentValidation.validation';
import { DocumentDTO } from '../../typings/document.typings';
import prisma from '~/services/prisma';

const createDocumentsService = async (dto: DocumentDTO) => {
    try {
        const {
            label,
            value,
            employeeId
        } = createDocumentValidation.parse(dto);

        const employeeExist = await genericService.getById(
            {
                id: employeeId,
                deleted: false
            },
            'employee'
        );

        if (!employeeExist) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND);
        };

        const documentExists = await prisma.document.findFirst({
            where: {
                value,
                deleted: false
            }
        });

        if (documentExists) {
            throw new AppError(['DOCUMENT_ALREADY_EXISTS'], StatusCode.BAD_REQUEST);
        }

        const document = await genericService.create({
            label,
            value,
            employeeId
        }, 'document');

        return document;
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

export default createDocumentsService