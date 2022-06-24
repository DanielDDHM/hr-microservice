import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import { Request, Response } from 'express';
import {DocumentDTO} from '../typings/document.typings'
import documentsService from '../services/documents/'
import genericService from '../services/generic'


const documentsController = (() => {


    const create = async (req: Request, res: Response) => {
      const documents = await documentsService.create(req.body as DocumentDTO);
      return res.status(StatusCode.OK).json(resultModel(documents, ['success'], true));
    }

    const update = async (req: Request, res: Response) => {
      const { id } = req.params;
      const documents = await documentsService.update({
        id,
        ...req.body
       } as DocumentDTO);
       return res.status(StatusCode.OK).json(resultModel(documents, ['success'], true));
     }

     const destroy = async (req: Request, res: Response) => {
      const { id } = req.params;  
      const result = await genericService.destroy(id, 'document');  
      return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }

    return {
      create,
      update,
      destroy
    }
  })();

  export default documentsController; 