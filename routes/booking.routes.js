const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Middleware para proteger rutas
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');

// Ruta para crear una nueva reserva (accesible solo para usuarios autenticados)
router.post('/', protect, bookingController.createBooking);

// Ruta para obtener todas las reservas de un usuario específico (accesible solo para el usuario correspondiente o administradores)
router.get('/user/:userId', protect, restrictToSelf, restrictTo('admin', 'user'), bookingController.getBookingsByUser);

// Ruta para cancelar una reserva (accesible solo para el administradores)
router.delete('/:userId/:id', protect, restrictToSelf, restrictTo('admin', 'user'), bookingController.cancelBooking);

// acceder a todas las reservas. Restringido a los administradores
router.get('/', protect, restrictTo('admin'), bookingController.getAllBookings);

// actualizar la reserva. Restringido a los administradores.
router.patch('/:id', protect, restrictTo('admin'), bookingController.updateBooking);

module.exports = router;