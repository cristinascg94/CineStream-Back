const Serie = require('../models/serie.model');

const serieController = {
    // Agregar una pelicula 
    addSerie: async (req, res) => {
        try {
            const { title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailler, pricePerDay } = req.body;
            const newFilm = new Serie({
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

            await newSerie.save();
            res.status(201).json({ message: 'Serie agregada con éxito', serie: newSerie });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar la serie', error: error.message });
        }
    },

    // Obtener todas las serie
    getAllSeries: async (req, res) => {
        try {
            const series = await Serie.find({});
            res.status(200).json(series);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las series', error: error.message });
        }
    },

    // Obtener una serie específico
    getSerie: async (req, res) => {
        try {
            const { id } = req.params;
            const serie = await Serie.findById(id);

            if (!serie) {
                return res.status(404).json({ message: 'Serie no encontrada' });
            }

            res.status(200).json(serie);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la serie', error: error.message });
        }
    },

    // Actualizar una serie
    updateSerie: async (req, res) => {
        try {
            const { id } = req.params;
            const {  title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailler, pricePerDay, available } = req.body;
            const updatedSerie = await Film.findByIdAndUpdate(id, {
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

            if (!updatedSerie) {
                return res.status(404).json({ message: 'Serie no encontrado' });
            }

            res.status(200).json({ message: 'Serie actualizada con éxito', serie: updatedSerie });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la serie', error: error.message });
        }
    },

    // Eliminar una serie
    deleteSerie: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedSerie = await Serie.findByIdAndDelete(id);

            if (!deletedSerie) {
                return res.status(404).json({ message: 'Serie no encontrada' });
            }

            res.status(200).json({ message: 'Serie eliminada con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la serie', error: error.message });
        }
    }
};

module.exports = serieController;
