import e from 'express';
import 'express-async-errors';

import AppError from '../exceptions/appError.exception';
import resultModel from '../helpers/resultModel';
import StatusCode from '../helpers/statusCode';

import employeesRoutes from './employees.routes';
import departmentsRoutes from './departments.routes';
import departmentTeamsRoutes from './departmentTeam.routes';
import departmentGroupsRoutes from './departmentGroup.routes';
import paycheckHistoryRoutes from './paycheckHistory.routes';
import documentRoutes from './document.routes';
import strikeRoutes from './strike.routes';
import addressRoutes from './address.routes';
import promotionRoutes from './promotion.routes';
import contactsRoutes from './contacts.routes';
import schedulesRoutes from './schedules.routes';

const rootRoutes = e.Router();

rootRoutes.use('/v1/department', departmentsRoutes);
rootRoutes.use('/v1/departmentTeam', departmentTeamsRoutes);
rootRoutes.use('/v1/departmentGroup', departmentGroupsRoutes);
rootRoutes.use('/v1/employee', employeesRoutes);
rootRoutes.use('/v1/employee/schedule', schedulesRoutes);
rootRoutes.use('/v1/employee/strike', strikeRoutes);
rootRoutes.use('/v1/employee/address', addressRoutes);
rootRoutes.use('/v1/employee/paycheckHistory', paycheckHistoryRoutes);
rootRoutes.use('/v1/employee/promotion', promotionRoutes);
rootRoutes.use('/v1/employee/document', documentRoutes);
rootRoutes.use('/v1/employee/contact', contactsRoutes);

rootRoutes.use(async (err: Error, request: e.Request, response: e.Response, _: e.NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json(resultModel({}, err.messages, false));
    }
    return response
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(resultModel({}, [JSON.stringify(err)], false));
});

export default rootRoutes;