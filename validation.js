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

movie_validation.body = joi.object().keys({
    rank_id: joi.number().required(),
    director_id: joi.number().required(),
    title: joi.string().min(3).required(),
    description: joi.string().min(3).max(200).required(),
    runtime: joi.number().required(),
    genre: joi.string().min(3).max(30).required(),
    rating: joi.number().required(),
    metascore: joi.number().required(),
    votes: joi.number().required(),
    gross_earning_in_mil: joi.number().required(),
    actor: joi.string().min(3).max(50).required(),
    year: joi.number().required()
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