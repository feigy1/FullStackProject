const LocationModel = require('../models/Location');
class LocationRepository {
    async get(quaryParams) {
        let LocationToRes;
        LocationToRes = await LocationModel.find();
        return LocationToRes;
    }
    async getById(id) {
        const location = await LocationModel.findById(id);
        return location;
    }
    async insert(location) {
        const newlocation = new LocationModel(location);
        await newlocation.save();
        return newlocation;
    }
    async update(id, objToUpdate) {
        let location = await LocationModel.updateOne({ "_id": id },{$set:objToUpdate});
        return location;
    }
    async delete(id) {
        let location = await LocationModel.deleteOne({ "_id": id });
        return location;
    }

}
let locationRepository = new LocationRepository();

module.exports = locationRepository;
