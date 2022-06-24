import * as z from 'zod';
import AppError from '~/exceptions/appError.exception';
import parseZodErrors from '~/helpers/parseZodErrors';
import StatusCode from '~/helpers/statusCode';
import { AddressDTO } from '~/typings';
import { updateAddressValidation } from '~/validations';
import genericService from '../generic';

const updateAddressService = async (dto: AddressDTO) => {
    try {
        const {
            id,
            city,
            country,
            employeeId,
            neighborhood,
            number,
            state,
            streetName,
            zipcode,
            reference
        } = updateAddressValidation.parse(dto);

        const employeeExists = await genericService.getById({id: employeeId, deleted:false},'employee')

        if (!employeeExists) {
            throw new AppError(['EMPLOYEE_NOT_FOUND'], StatusCode.NOT_FOUND);
        }

        const address = await genericService.update(id, {
            city,
            country,
            employeeId,
            neighborhood,
            number,
            state,
            streetName,
            zipcode,
            reference
        }, 'address');

        return address;
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

export default updateAddressService
