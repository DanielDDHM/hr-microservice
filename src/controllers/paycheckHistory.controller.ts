import { Request, Response } from 'express';

import {
    PaycheckHistoryDTO
} from '../typings';
import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import paycheckHistoryService from '../services/paycheckHistory/index'

const paycheckHistoryController = (() => {

    const create = async (req: Request, res: Response) => {
        const user = await paycheckHistoryService.create(req.body as PaycheckHistoryDTO);
        return res.status(StatusCode.OK).json(resultModel(user, ['success'], true));
    }

    return {
        create,
    }
})();

export default paycheckHistoryController;
