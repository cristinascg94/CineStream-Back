//  TO DO: actualizar los controllers


const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controller');

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para obtener todas los peliculas (acceso: todos)
router.get('/', filmController.getAllFilms);

// Ruta para obtener una pelicula específica (acceso: todos)
router.get('/:id', filmController.getFilm);

// Ruta para agregar una nueva pelicula (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), filmController.addFilm);

// Ruta para actualizar una pelicula (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), filmController.updateFilm);

// Ruta para eliminar una pelicula (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), filmController.deleteFilm);

module.exports = router;