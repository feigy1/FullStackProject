const PriorityModel = require('../models/Priority');
class PriorityRepository {
    async get(quaryParams) {
        let PriorityToRes = await PriorityModel.find();
        return PriorityToRes;
    }
    async getById(id) {
        const Priority = await PriorityModel.find({ "id": id });
        return Priority;
    }
    async insert(Priority) {
        const newPriority = new PriorityModel(Priority);
        await newPriority.save();
        return newPriority;
    }
    async update(id, objToUpdate) {
        let Priority = await PriorityModel.updateOne({ "_id": id },{$set:objToUpdate});
        return Priority;
    }
    async delete(id) {
        let Priority = await PriorityModel.deleteOne({ "_id": id });
        return Priority;
    }

}
let priorityRepository = new PriorityRepository();

module.exports = priorityRepository;
