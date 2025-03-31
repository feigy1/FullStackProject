const HelpRequestRepRepository = require("../DAL/Repository/HelpRequestRep");
const dataError = require("./Errors/dataError");
const BaseService = require("./BaseService");
const idError = require("./Errors/idError");
const validHelpRequest = require("./validations/HelpRequestValidator");
class HelpRequestService extends BaseService {
    constructor() {
        super(HelpRequestRepRepository);
    }
    async insert(item) {
        let valid = validHelpRequest(item);
        if (valid.error) {
            throw new idError("error");
        }
        else {
            let result = await this.repository.insert(item);
            return result
        }
    }
}
let helpRequestService = new HelpRequestService();
module.exports = helpRequestService;
