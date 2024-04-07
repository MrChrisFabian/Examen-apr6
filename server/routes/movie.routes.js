const express = require("express");

const { createNewmovie, deletemovieById, getAllmovies, getOnemovieById, updatemovie, addRatingAndReviewToMovie } = require('../controllers/movie.controller');
const { authenticate } = require("../config/jwt.config");

const MovieRouter = express.Router();

MovieRouter.post("/", authenticate, createNewmovie); //authenticate= only for logged in users
MovieRouter.get("/", authenticate, getAllmovies);
MovieRouter.get("/:id", authenticate, getOnemovieById);
// MovieRouter.put("/:id", authenticate, updatemovie)
MovieRouter.put("/:id", authenticate, addRatingAndReviewToMovie)
MovieRouter.delete("/:id", authenticate, deletemovieById)
module.exports = MovieRouter;