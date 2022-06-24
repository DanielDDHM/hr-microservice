import getByIdService from './getById.service';
import destroyService from './destroy.service';
import createService from './create.service';
import updateService from './update.service';
import getAllService from './getAll.service';

export default {
    create: createService,
    update: updateService,
    destroy: destroyService,
    getById: getByIdService,
    getAll: getAllService,
}