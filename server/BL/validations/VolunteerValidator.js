const joi = require('joi');

const validVolunteer = (_bodyData) => {
    let joiSchema = joi.object({
        id: joi.number().min(100000000).max(999999999).pattern(/^[0-9]{9,10}$/).required(),
        firstName: joi.string().min(2).required(),
        lastName: joi.string().min(2).required(),
        phone: joi.string().pattern(/^[0-9]{9,10}$/).required(),
        specialisations: joi.array().items(joi.string().min(2)).optional()
    })
    return joiSchema.validate(_bodyData);
}

module.exports = validVolunteer;
