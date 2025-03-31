const idError = require("./Errors/idError");

class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async get(quaryParams) {
        let result = await this.repository.get(quaryParams);
        return result;
    }
    async getById(id) {
        let result = await this.repository.getById(id);
        if (result && result.length != 0)
            return result;
        throw new idError('this id is not exist');
    }
    async insert(item) {
        let result = await this.repository.insert(item);
        return result
    }
    async update(id, item) {
        let existingRequest = await this.repository.getById(id);
        if (!existingRequest) {
            throw new idError('This ID does not exist');
        }
        return await this.repository.update(id, item);
    }
    async delete(id) {
        let result = await this.repository.getById(id);
        if (result)
            return await this.repository.delete(id);
        throw new idError('this id is not exist');
    }
}
module.exports = BaseService;