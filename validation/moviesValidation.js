const joi = require('joi');
const movie_validation = {};
movie_validation.id = joi.object().keys({
    id: joi.number().required()
})
movie_validation.body = joi.object().keys({
    rank_id: joi.number().required(),
    director_id: joi.number().required(),
    title: joi.string().min(3).required(),
    Description: joi.string().min(3).max(200).required(),
    Runtime: joi.number().required(),
    Genere: joi.string().min(3).max(30).required(),
    Rating: joi.number().required(),
    Metascore: joi.number().required(),
    Votes: joi.number().required(),
    Gross_Earning_in_Mil: joi.number().required(),
    Actor: joi.string().min(3).max(50).required(),
    Year: joi.number().required()

})
module.exports = { movie_validation };