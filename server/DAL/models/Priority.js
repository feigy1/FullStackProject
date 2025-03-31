const mongoose = require('../mongoConnect');

const priorities = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: "critical"
}

const PrioritySchema = new mongoose.Schema({
    id: Number,
    description: Object.values(priorities)
});

const PriorityModel = mongoose.model("priorities", PrioritySchema);

module.exports = PriorityModel;