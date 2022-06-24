import * as z from 'zod';

import { AvailableModelsNames, GetAllPaginate } from '~/typings';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import prisma from '~/services/prisma';
import { getAllValidation } from '~/validations/generics/getAll.validations';

const getAllService = async (dto: GetAllPaginate, query: Object, model: AvailableModelsNames) => {
    try {
        const { page, perPage } = getAllValidation.parse(dto);

        const queryValues = Object.keys(query!).map((k) => {
            const type = typeof query![k];
            if (type === 'number' || type === 'bigint') {
                return {
                    OR: {
                        [k]: {
                            equals: query![k],
                        },
                    }
                }
            } else if (type === 'string') {
                return {
                    OR: {
                        [k]: {
                            contains: query![k],
                            mode: 'insensitive'
                        }
                    }
                }
            } else if (type === 'boolean') {
                return {
                    OR: {
                        [k]: query![k],
                    }
                }
            } else if (query![k].FK) {
                return {
                    OR: {
                        [k]: query![k].FK,
                    }
                }
            }
        });

        const [data, total] = await prisma.$transaction([
            prisma[model as string].findMany({
                where: !queryValues.length ? {} : {
                    OR: queryValues,
                },
                skip: (Number(page) - 1) * Number(perPage),
                take: Number(perPage),
            }), prisma[model as string].count({
                where: !queryValues.length ? {} : {
                    OR: queryValues,
                },
            })
        ]);

        return {
            data: data,
            totalPages: total > perPage ? Math.ceil(total / Number(perPage)) : 1,
            total,
        };

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

export default getAllService;