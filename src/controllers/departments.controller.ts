import { Request, Response } from 'express';

import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import departmentService from '~/services/departments';
import genericService from '~/services/generic';
import { DepartmentDTO, GetAllPaginate, GetAllDepartmentsFilters } from '~/typings';

const departmentsController = (() => {

  const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await genericService.getById({
      id, deleted: false,
    }, 'department', {
      teams: true
    });

    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  const create = async (req: Request, res: Response) => {
    const user = await departmentService.create(req.body as DepartmentDTO);
    return res.status(StatusCode.OK).json(resultModel(user, ['success'], true));
  }

  const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await genericService.update(id, req.body as DepartmentDTO, 'department');
    return res.status(StatusCode.OK).json(resultModel(user, ['success'], true));
  }

  const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await genericService.destroy(id, 'department');

    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  const getAll = async (req: Request, res: Response) => {
    const { page, perPage, filter } = req.query;

    const query: GetAllDepartmentsFilters = !filter || filter === 'null' ? {} : filter as GetAllDepartmentsFilters;

    const result = await genericService.getAll({
      page: Number(page) || 1,
      perPage: Number(perPage) || 10
    } as GetAllPaginate, query,
      'department');

    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  return {
    getById,
    create,
    update,
    destroy,
    getAll,
  }
})();

export default departmentsController;