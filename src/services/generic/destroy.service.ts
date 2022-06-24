import * as z from 'zod';

import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import prisma from '~/services/prisma';
import { AvailableModelsNames } from '~/typings';
import getById from './getById.service';

const destroy = async (id: string, model: AvailableModelsNames) => {
    try {

        if (!id) {
            throw new AppError(['ID_CANNOT_BE_NULL'], StatusCode.BAD_REQUEST);
        }

        const object = await getById({
            id, deleted: false
        }, model);

        if (!object) {
            throw new AppError(['NOT_FOUND'], StatusCode.NOT_FOUND);
        }
        
        return await prisma[model as string].update({
            where: {
                id
            },
            data: {
                deleted: true,
                updatedAt: new Date(),
                deletedAt: new Date(),
            }
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

export default destroy;