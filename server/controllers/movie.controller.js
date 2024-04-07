const moviesModel = require('../models/movie.model');

module.exports = {
    createNewmovie: (req, res) => {
        moviesModel.create(req.body)
            .then(newlyCreatedmovie => res.status(201).json({ movie: newlyCreatedmovie }))
            .catch(err => res.status(400).json({ message: "Something went wrong creating the movie", error: err })
            );
    },
    getAllmovies: (req, res) => {
        moviesModel.find()
            .then((allmovies) => res.status(200).json({ movie: allmovies }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    getOnemovieById: (req, res) => {
        moviesModel.findOne({ _id: req.params.id })
            .then((OneElement) => res.status(200).json({ movie: OneElement }))
            .catch((err) => res.status(400).json({ message: "Algo no funciono correctamente", error: err }))
    },
    updatemovie: (req, res) => {
        moviesModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true }) // si no le ponemos el new:true te devuelve el anterior
            .then((Updatedmovie) => res.json({ movie: Updatedmovie }))
            .catch((err) =>
                res.status(400).json({ message: "Algo no funciono como se esperaba", error: err }))
    },
    deletemovieById: (req, res) => {
        moviesModel.deleteOne({ _id: req.params.id })
            .then((result) => res.json({ result: result }))
            .catch((err) => res.json({ message: 'Algo no funciono correctamente :(', error: err }))
    },
    addRatingAndReviewToMovie: (req, res) => {
        moviesModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    Rating: req.body.Rating, 
                    review: req.body.review,
                    reviewer: req.body.reviewer
                }
            },
            { new: true, runValidators: true }
        )
            .then((updatedMovie) => res.json({ movie: updatedMovie }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    }

}