const fs = require("fs")
let movies = JSON.parse(fs.readFileSync("./data/movies.json"))


const getAllMovies = (req, res) => {
    res.status(200).json(
        {
            status: "success",
            requestedAt: req.requestedAt,
            count: movies.length,
            data: {
                movies: movies
            }
        }
    )
}

const getMovie = (req, res) => {
    const id = req.params.id * 1;
    let movie = movies.find(el => el.id === id)

    res.status(200).json(
        {
            status: "success",
            data: {
                movie: movie
            }
        }
    )
}

const createMovie = (req, res) => {
    const newId = movies[movies.length - 1].id + 1
    const newMovie = Object.assign({ id: newId }, req.body)
    movies.push(newMovie)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json(
            {
                status: "success",
                data: {
                    movie: newMovie
                }
            }
        )
    })
}

const updateMovie = (req, res) => {
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id)

    let index = movies.indexOf(movieToUpdate)

    Object.assign(movieToUpdate, req.body)
    movies[index] = movieToUpdate

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json(
            {
                status: "success",
                data: {
                    movie: movieToUpdate
                }
            }
        )
    })
}

const deleteMovie = (req, res) => {
    let id = req.params.id * 1
    let movieToDelete = movies.find(el => el.id === id)

    let index = movies.indexOf(movieToDelete)

    movies.splice(index, 1)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204)
            .json(
                {
                    status: "success",
                    data: {
                        movie: null
                    }
                }
            )
    })

}


module.exports = {
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
}