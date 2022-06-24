import * as z from 'zod';

import { AvailableModelsNames } from '~/typings';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import prisma  from '~/services/prisma';

const getObjectByIdService = async (
    where: {
        id: string,
        deleted: boolean,
    },
    model: AvailableModelsNames,
    include?: any
) => {
    try {
        if (!where.id) {
            throw new AppError(['ID_CANNOT_BE_NULL'], StatusCode.BAD_REQUEST);
        }

        if (!include ) {
            return await prisma[model as string].findFirst({
                where,
            });
        }

        return await prisma[model as string].findFirst({
            where,
            include,
        });
        
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

export default getObjectByIdService;