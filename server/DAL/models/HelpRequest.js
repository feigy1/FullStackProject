const mongoose = require('../mongoConnect');

const Status= {
     WAIT : 'wait',
     TREATED : 'treated',
     FINISHED : 'finished'
}

const HelpRequestSchema = new mongoose.Schema({
    LocationId: Number,
    description: String,
    phone: String,
    status:Object.values(Status),
    numPeopleStuck:Number,
    idpriority:Number,
    idVolunteer:Number
});

const HelpRequestModel = mongoose.model("helprequests", HelpRequestSchema);

module.exports = HelpRequestModel;

