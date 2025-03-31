const HelpRequestModel = require('../models/HelpRequest');
const LocationModel = require('../models/Location');
const PriorityModel = require('../models/Priority');
const mongoose = require("mongoose");
class HelpRequestRepository {
    async get(quaryParams) {
        let HelpRequestToRes;
        if (quaryParams.location) {
            let locationData = await LocationModel.findOne({ "street": quaryParams.location });
            HelpRequestToRes = await HelpRequestModel.find({ "LocationId": locationData.id });
        }
        else if (quaryParams.volunteerId)
            HelpRequestToRes = await HelpRequestModel.find({ "idVolunteer": quaryParams.volunteerId });
        else if (quaryParams.status) {
            HelpRequestToRes = await HelpRequestModel.find({ "status": quaryParams.status });
        }
        else if (quaryParams.priority) {
            let priorityData = await PriorityModel.findOne({ "description": quaryParams.priority });
            HelpRequestToRes = await HelpRequestModel.find({ "idpriority": priorityData.id });
        }
        else
            HelpRequestToRes = await HelpRequestModel.find();
        return HelpRequestToRes;
    }
    async getById(id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            const helpRequest = await HelpRequestModel.findById(objectId);
            return helpRequest;
        } catch (error) {
            console.error("Invalid ObjectId:", error);
            return null; 
        }
    }
    async insert(HelpRequest) {
        const newHelpRequest = new HelpRequestModel(HelpRequest);
        await newHelpRequest.save();
        return newHelpRequest;
    }
    async update(id, objToUpdate) {
        let existingRequest = await HelpRequestModel.findById(id);
        if (!existingRequest) {
            throw new Error("Help request not found");
        }
        return await HelpRequestModel.updateOne({ "_id": id }, { $set: objToUpdate });
    }


    async delete(id) {
        let HelpRequest = await HelpRequestModel.deleteOne({ "_id": id });
        return HelpRequest;
    }

}
let helpRequestRepository = new HelpRequestRepository();

module.exports = helpRequestRepository;
