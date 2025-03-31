const joi = require('joi');

const validLocation = (_bodyData)=>{
    let joiSchema = joi.object({
        id: joi.number().min(1).max(9).pattern(/^[0-9]{9,10}$/).required(),
        street :joi.string().min(2).required()
    })
    return joiSchema.validate(_bodyData);
}

module.exports = validLocation;

