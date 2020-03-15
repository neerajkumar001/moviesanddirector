const joi = require('joi');
const director_validation = {};
director_validation.name = joi.object().keys({
    director_name: joi.string().required()
})
director_validation.id = joi.object().keys({
    id: joi.number().required()
})
director_validation.update = joi.object().keys({
    id: joi.number().required(),
    director_name: joi.string().required()
})

const movie_validation = {};
movie_validation.id = joi.object().keys({
    id: joi.number().required()
})
module.exports = { director_validation, movie_validation };



// const joi = require('joi');
// async function validation(req, res) {
//     const scheme = joi.object().keys({
//         director_name: joi.string().required()
//     })
//     const { value, error } = joi.validate(req.body, scheme);

//     if (error & error.details) {
//         return res.status(400).json(error);
//     }
//     return res.json(value)
// }
// validation('{}').then((x) => {
//     console.log(x);
// });