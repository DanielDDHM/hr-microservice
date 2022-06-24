import { Request, Response } from 'express';

import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import departmentGroupService from '../services/departmentGroups';
import genericService from '../services/generic';
import { DepartmentGroupDTO, GetAllPaginate, GetAllDepartmentGroupFilters } from '../typings';

const departmentGroupController = (() => {

    const create = async (req: Request, res: Response) => {
      const departmentGroup = await departmentGroupService.create(req.body as DepartmentGroupDTO);
      return res.status(StatusCode.OK).json(resultModel(departmentGroup, ['success'], true));
    }

    const update = async (req: Request, res: Response) => {
      const { id } = req.params;
      const departmentGroup = await departmentGroupService.update({
       id,
       ...req.body
      } as DepartmentGroupDTO);
      
      return res.status(StatusCode.OK).json(resultModel(departmentGroup, ['success'], true));
    }
  
    const destroy = async (req: Request, res: Response) => {
      const { id } = req.params;  
      const result = await genericService.destroy(id, 'departmentGroup');  
      return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }
    
   const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await genericService.getById({
      id, deleted: false,
    }, 'departmentGroup');
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }


  const getAll = async (req: Request, res: Response) => {
    const { page, perPage, filter } = req.query;
    const query: GetAllDepartmentGroupFilters = !filter || filter === 'null' ? {} : filter as GetAllDepartmentGroupFilters;
    const result = await genericService.getAll({
      page: Number(page) || 1,
      perPage: Number(perPage) || 10
    } as GetAllPaginate, query,
      'departmentGroup');
    return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
  }

    return {
      create,
      update,
      destroy,
      getById,
      getAll
    }
  })();

  export default departmentGroupController;