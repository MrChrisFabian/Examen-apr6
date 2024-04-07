const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const movieSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Por Favor minimo 3 caracteres en el Nombre del movie"],
        maxlength: [50, "Máximo 50 caracteres en el Nombre del movie"]
    },
    Rating: {
        type: [Number],
        required: true,
        min: [1, "El rating minimo es 1"],
        max: [5, "El rating maximo es 5"]
    },
    review: {
        type: [String],
        required: true,
        minlength: [3, "Por Favor minimo 3 caracteres en el review"],
        maxlength: [500, "Máximo 500 caracteres en el review"],
    },
    reviewer: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true,
});

movieSchema.plugin(uniqueValidator)
const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;