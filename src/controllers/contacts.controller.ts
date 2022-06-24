import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import { Request, Response } from 'express';
import contactsService from '../services/contacts/';
import genericService from '~/services/generic';
import { ContactDTO } from '~/typings';


const contactsController = (() => {

    const create = async (req: Request, res: Response) => {
        const contacts = await contactsService.create(req.body as ContactDTO);
        return res.status(StatusCode.OK).json(resultModel(contacts, ['success'], true));
    }

    const update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const contacts = await contactsService.update({
            id,
            ...req.body
        } as ContactDTO);
        return res.status(StatusCode.OK).json(resultModel(contacts, ['success'], true));
    }

    const destroy = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await genericService.destroy(id, 'contact');
        return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }

    return {
        create,
        update,
        destroy,
    }

})();

export default contactsController;