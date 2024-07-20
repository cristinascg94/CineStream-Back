

const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serie.controller');

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para obtener todas las series (acceso: todos)
router.get('/', serieController.getAllSeries);

// Ruta para obtener una serie específica (acceso: todos)
router.get('/:id', serieController.getSerie);

// Ruta para agregar una nueva serie (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), serieController.addSerie);

// Ruta para actualizar una serie (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), serieController.updateSerie);

// Ruta para eliminar una serie (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), serieController.deleteSerie);

module.exports = router;