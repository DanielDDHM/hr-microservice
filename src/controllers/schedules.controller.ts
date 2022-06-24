import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import { Request, Response } from 'express';
import schedulesService from '../services/schedules/';
import genericService from '~/services/generic';
import { ScheduleDTO } from '~/typings';


const schedulesController = (() => {

    const create = async (req: Request, res: Response) => {
        const schedule = await schedulesService.create(req.body as ScheduleDTO);
        return res.status(StatusCode.OK).json(resultModel(schedule, ['success'], true));
    }

    const update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const schedule = await schedulesService.update({
            id,
            ...req.body
        } as ScheduleDTO);
        return res.status(StatusCode.OK).json(resultModel(schedule, ['success'], true));
    }

    const destroy = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await genericService.destroy(id, 'schedule');
        return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }

    return {
        create,
        update,
        destroy,
    }

})();

export default schedulesController;
