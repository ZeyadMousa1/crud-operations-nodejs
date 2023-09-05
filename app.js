const express = require('express')
const morgan = require("morgan")
const moviesRouter = require("./routes/movieRoutes")

let app = express()


const logger = function (req, res, next) {
    console.log('Cusom middelware called')
    next()
}

//USE MIDDELWARES
app.use(express.json())
app.use(morgan('dev'))
app.use(logger)
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString()
    next()
})


//USE ROUTES
app.use('/api/v1/movies', moviesRouter)


module.exports = app