import { Request, Response } from 'express';

import {
  AddressDTO
} from '../typings';
import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import addressService from '../services/addresses';
import genericService from '../services/generic';

const AddressController = (() => {

  const create = async (req: Request, res: Response) => {

    const address = await addressService.create(req.body as AddressDTO);

    return res.status(StatusCode.OK).json(resultModel(address, ['success'], true));
  }

  const update = async (req: Request, res: Response) => {
    const { id } = req.params

    const address = await addressService.update({
      id,
      ...req.body
    });

    return res.status(StatusCode.OK).json(resultModel(address, ['success'], true));
  }

  const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await genericService.destroy(id, 'address');
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  return {
    create,
    update,
    destroy
  }
})();

export default AddressController;