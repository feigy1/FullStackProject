const PriorityRepository = require("../DAL/Repository/PriorityRep");
const BaseService = require("./BaseService");
const dataError = require("./Errors/dataError");
const idError = require("./Errors/idError");
const validPriority = require("./validations/PriorityValidator");
class PriorityService extends BaseService {
    constructor() {
        super(PriorityRepository);
    }
    async insert(item) {
        let valid = validPriority(item);
        if (valid.error)
            throw new idError("error");
        else {
            let priority = await this.repository.getById(item.id);
            if (priority.length == 0)
                return await this.repository.insert(item);
            else
                throw new idError("this id is already exist");
        }
    }
}
let priorityService = new PriorityService();
module.exports = priorityService;
