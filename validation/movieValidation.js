const fs = require("fs")
let movies = JSON.parse(fs.readFileSync("./data/movies.json"))

const checkMovieID = (req, res, next, value) => {
    let movie = movies.find(el => el.id === value * 1)
    if (!movie) {
        return res.status(404).json(
            {
                status: "fail",
                msg: `Movie with id ${value} is not found`
            }
        )
    }
    next()
}

const validateBody = (req, res, next) => {
    if (!req.body.name || !req.body.relaseYear) {
        return res.status(400).json({
            status: "fail",
            msg: "Not valid movie data"
        })
    }
    next()
}

module.exports = {
    checkMovieID,
    validateBody
}



