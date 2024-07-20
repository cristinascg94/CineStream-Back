const Film = require('../models/film.model');

const filmController = {
    // Agregar una pelicula 
    addFilm: async (req, res) => {
        try {
            const { title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailler, pricePerDay } = req.body;
            const newFilm = new Film({
                title,
                director,
                actors,                
                year,
                thema,
                synopsis,
                image,
                valoration,
                ageRestriction,
                trailler,         
                pricePerDay,
                available: true,
            });

            await newFilm.save();
            res.status(201).json({ message: 'Película agregada con éxito', film: newFilm });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar la película', error: error.message });
        }
    },

    // Obtener todas las peliculas
    getAllFilms: async (req, res) => {
        try {
            const films = await Film.find({});
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
        }
    },

    // Obtener una pelicula específico
    getFilm: async (req, res) => {
        try {
            const { id } = req.params;
            const film = await Film.findById(id);

            if (!film) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }

            res.status(200).json(film);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la película', error: error.message });
        }
    },

    // Actualizar una pelicula
    updateFilm: async (req, res) => {
        try {
            const { id } = req.params;
            const {  title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailler, pricePerDay, available } = req.body;
            const updatedFilm = await Film.findByIdAndUpdate(id, {
                title,
                director,
                actors,                
                year,
                thema,
                synopsis,
                image,
                valoration,
                ageRestriction,
                trailler,         
                pricePerDay,
                available
            }, { new: true });

            if (!updatedFilm) {
                return res.status(404).json({ message: 'Película no encontrado' });
            }

            res.status(200).json({ message: 'Película actualizada con éxito', film: updatedFilm });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la película', error: error.message });
        }
    },

    // Eliminar un vehículo
    deleteFilm: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedFilm = await Film.findByIdAndDelete(id);

            if (!deletedFilm) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }

            res.status(200).json({ message: 'Película eliminada con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
        }
    }
};

module.exports = filmController;
