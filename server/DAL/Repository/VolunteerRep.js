const VolunteerModel = require('../models/Volunteer');
class VolunteerRepository {
    async get(quaryParams) {
        let VolunteerToRes;
        VolunteerToRes = await VolunteerModel.find();
        return VolunteerToRes;
    }
    async getById(id) {
        console.log("Id: "+id);
        const volunteer = await VolunteerModel.findOne({ id: id });
        console.log("getById: "+volunteer);
        return volunteer;
    }
    async insert( Volunteer) {
        console.log("נכנסתי ל insert");
        const newVolunteer = new VolunteerModel( Volunteer);
        await newVolunteer.save();
        console.log("יצאתי מה-  insert");
        console.log("newVolunteer: "+newVolunteer);
        return newVolunteer;
    }
    async update(id, objToUpdate) {
        let  Volunteer = await VolunteerModel.updateOne(
            { "_id": id },
            {$set:objToUpdate});
        return  Volunteer;
    }
    async delete(id) {
        let  Volunteer = await VolunteerModel.deleteOne({ "_id": id });
        return  Volunteer;
    }

}
let volunteerRepository = new VolunteerRepository();

module.exports = volunteerRepository;
