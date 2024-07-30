const Movie = require('../models/movie.model');

const movieController = {
    // Agregar una pelicula 
    addMovie: async (req, res) => {
        try {
            const { title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailer, pricePerDay, type } = req.body;
            const newMovie = new Movie({
                title,
                director,
                actors,                
                year,
                thema,
                synopsis,
                image,
                valoration,
                ageRestriction,
                trailer,         
                pricePerDay,
                type
            });

            await newMovie.save();
            res.status(201).json({ message: 'Película agregada con éxito', movie: newMovie });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar la película', error: error.message });
        }
    },

    // Obtener todas las peliculas
    getAllMovies: async (req, res) => {
        try {
            const movies = await Movie.find({});
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
        }
    },

    // Obtener una pelicula específico
    getMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findById(id);

            if (!movie) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }

            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la película', error: error.message });
        }
    },

    // Actualizar una pelicula
    updateMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const {  title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailer, pricePerDay } = req.body;
            const updatedMovie = await Movie.findByIdAndUpdate(id, {
                title,
                director,
                actors,                
                year,
                thema,
                synopsis,
                image,
                valoration,
                ageRestriction,
                trailer,         
                pricePerDay,
            }, { new: true });

            if (!updatedMovie) {
                return res.status(404).json({ message: 'Película no encontrado' });
            }

            res.status(200).json({ message: 'Película actualizada con éxito', movie: updatedMovie });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la película', error: error.message });
        }
    },

    // Eliminar un vehículo
    deleteMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedMovie = await Movie.findByIdAndDelete(id);

            if (!deletedMovie) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }

            res.status(200).json({ message: 'Película eliminada con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
        }
    }
};

module.exports = movieController;
