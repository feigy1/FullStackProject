const joi = require('joi');

const validPriority = (_bodyData)=>{
    let joiSchema = joi.object({
        id: joi.number().min(1).max(9).pattern(/^[0-9]{9,10}$/).required(),
        description :joi.string().valid('low', 'medium', 'high','critical').required()
    })
    return joiSchema.validate(_bodyData);
}

module.exports = validPriority;

