import { Request, Response } from 'express';

import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';
import departmentTeamService from '../services/departmentTeams';
import genericService from '../services/generic';
import { DepartmentTeamDTO, GetAllPaginate, GetAllDepartmentTeamFilters } from '../typings';

const departmentTeamsController = (() => {

    const getById = async (req: Request, res: Response) => {
      const { id } = req.params;

      const result = await genericService.getById({
        id, deleted: false,
      }, 'departmentTeam');

      return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }
    
    const create = async (req: Request, res: Response) => {
      const departmentTeams = await departmentTeamService.create(req.body as DepartmentTeamDTO);
      return res.status(StatusCode.OK).json(resultModel(departmentTeams, ['success'], true));
    }

    const update = async (req: Request, res: Response) => {
      const { id } = req.params;
      const departmentTeam = await departmentTeamService.update({
        id,
        ...req.body
       } as DepartmentTeamDTO);
       return res.status(StatusCode.OK).json(resultModel(departmentTeam, ['success'], true));
     }
  
    const destroy = async (req: Request, res: Response) => {
      const { id } = req.params;
  
      const result = await genericService.destroy(id, 'departmentTeam');
  
      return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }

    const getAll = async (req: Request, res: Response) => {
      const { page, perPage, filter } = req.query;
      const query: GetAllDepartmentTeamFilters = !filter || filter === 'null' ? {} : filter as GetAllDepartmentTeamFilters;
      const result = await genericService.getAll({
        page: Number(page) || 1,
        perPage: Number(perPage) || 10
      } as GetAllPaginate, query,
        'departmentTeam');
      return res.status(StatusCode.OK).json(resultModel(result, ['success'], true));
    }
  
    return {
      getById,
      create,
      update,
      destroy,
      getAll
    }
  })();
  
  export default departmentTeamsController;