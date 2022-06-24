import { Request, Response } from 'express';

import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import strikeService from '~/services/strikes'
import genericService from '~/services/generic'
import { StrikeDTO } from '~/typings';

const strikeController = (() => {
 
  const create = async (req: Request, res: Response) => {
    const result = await strikeService.create(req.body as StrikeDTO);

    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await genericService.destroy(id, 'strike');
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  return {
    create,
    destroy
  }
})();

export default strikeController;