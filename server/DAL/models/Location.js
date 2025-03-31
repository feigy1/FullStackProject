const mongoose = require('../mongoConnect');

const LocationSchema = new mongoose.Schema({
    id: Number,
    street: String
});

const LocationModel = mongoose.model("locations", LocationSchema);

module.exports = LocationModel;
