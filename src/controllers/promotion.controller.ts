import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import { Request, Response } from 'express';
import { PromotionDTO } from '../typings/promotion.typings';
import promotionService from '../services/promotions/';
import genericService from '~/services/generic';


const promotionController = (() => {


    const create = async (req: Request, res: Response) => {
      const promotion = await promotionService.create(req.body as PromotionDTO);
      return res.status(StatusCode.OK).json(resultModel(promotion, ['success'], true));
    }

    const destroy = async (req: Request, res: Response) => {
      const { id } = req.params;  
      const result = await genericService.destroy(id, 'promotion');  
      return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }

    return {
      create,
      destroy
    }
  })();

  export default promotionController;  