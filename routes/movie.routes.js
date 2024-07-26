//  TO DO: actualizar los controllers


const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para obtener todas los peliculas (acceso: todos)
router.get('/', movieController.getAllMovies);

// Ruta para obtener una pelicula específica (acceso: todos)
router.get('/:id', movieController.getMovie);

// Ruta para agregar una nueva pelicula (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), movieController.addMovie);

// Ruta para actualizar una pelicula (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), movieController.updateMovie);

// Ruta para eliminar una pelicula (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), movieController.deleteMovie);

module.exports = router;