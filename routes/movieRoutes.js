const express = require("express");
const router = express.Router()
const {
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
} = require("../controller/moviesControllers")

const { checkMovieID, validateBody } = require('../validation/movieValidation')



router.route('/')
    .get(getAllMovies)
    .post(validateBody, createMovie)

router.param('id', checkMovieID)

router.route('/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)


module.exports = router;