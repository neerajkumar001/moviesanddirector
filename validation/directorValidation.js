const joi = require('joi');
const director_validation = {};
director_validation.name = joi.object().keys({
    director_name: joi.string().min(3).required()
})
director_validation.id = joi.object().keys({
    id: joi.number().required()
})
director_validation.update = joi.object().keys({
    id: joi.number().required(),
    director_name: joi.string().min(3).required()
})





module.exports = { director_validation };

