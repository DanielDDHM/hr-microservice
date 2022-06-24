import { Request, Response } from 'express';

import {
  EmployeeDTO, GetAllPaginate, GetAllEmployeesFilters
} from '../typings';
import resultModel from '../helpers/resultModel';
import employeesService from '../services/employees';
import StatusCode from '../helpers/statusCode';
import genericService from '~/services/generic';

const employeesController = (() => {

  const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await genericService.getById({
      id, deleted: false,
    }, 'employee', {
      addresses: true,
      contacts: true,
      documents: true,
      paychecks: true,
      promotions: true,
      schedules: true,
      strikes: true,
    });
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  const create = async (req: Request, res: Response) => {
    const user = await employeesService.create(req.body as EmployeeDTO);
    return res.status(StatusCode.OK).json(resultModel(user, ['success'], true));
  }

  const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await employeesService.update({
      id,
      ...req.body
    } as EmployeeDTO);
    return res.status(StatusCode.OK).json(resultModel(employee, ['success'], true));
  }

  const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await genericService.destroy(id, 'employee');
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  const getAll = async (req: Request, res: Response) => {
    const { page, perPage, filter } = req.query;

    const query: GetAllEmployeesFilters = !filter || filter === 'null' ? {} : filter as GetAllEmployeesFilters;

    const bool = (x: string | undefined) => {
      if (x === 'true') {
        return true;
      } else {
        return false;
      }
    }

    if (!!query.deleted) {
      query.deleted = bool(String(query.deleted));
    }

    const result = await genericService.getAll({
      page: Number(page) || 1,
      perPage: Number(perPage) || 10
    } as GetAllPaginate, query,
      'employee');
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

  return {
    create,
    update,
    getById,
    destroy,
    getAll,
  }
})();

export default employeesController;