const LocationRepository = require("../DAL/Repository/LocationRep");
const BaseService = require("./BaseService");
const idError = require("./Errors/idError");
const dataError = require("./Errors/dataError");
const validLocation = require("./validations/LocationValidator");
class LocationService extends BaseService {
    constructor() {
        super(LocationRepository);
    }
    async insert(item) {
        let valid = validLocation(item);
        if (valid.error)
            throw new idError("error");
        else {
            let location = await this.repository.getById(item.id);
            if (location.length == 0)
                return await this.repository.insert(item);
            else
                throw new idError(`id ${item.id} is already exist`);
        }
    }
}
let locationService = new LocationService();
module.exports = locationService;