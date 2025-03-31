const joi = require('joi');

const validHelpRequest = (_bodyData)=>{
    let joiSchema = joi.object({
        LocationId: joi.number().required().pattern(/^[0-9]{9,10}$/),
        description: joi.string().min(2).required(),
        phone: joi.string().pattern(/^[0-9]{9,10}$/).required(), 
        status: joi.string().valid('wait', 'treated', 'finished').required(), 
        numPeopleStuck: joi.number().min(1).required().pattern(/^[0-9]{9,10}$/), 
        idpriority: joi.number().min(1).required().pattern(/^[0-9]{9,10}$/),
        idVolunteer: joi.number().optional().pattern(/^[0-9]{9,10}$/)
    })
    return joiSchema.validate(_bodyData);
}

module.exports = validHelpRequest;
