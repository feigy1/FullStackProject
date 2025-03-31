const mongoose = require('../mongoConnect');

const VolunteerSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    phone: String,
    specialisations:[String]
});

const VolunteerModel = mongoose.model("volunteers", VolunteerSchema);

module.exports = VolunteerModel;