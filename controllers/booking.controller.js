const Booking = require('../models/booking.model');
const Film = require('../models/film.model');
const Serie = require('../models/serie.model');

const bookingController = {
    // Crear una nueva reserva
    createBooking: async (req, res) => {
        try {
            // Extraer los campos necesarios del cuerpo de la solicitud
            const { type, item, startDate, endDate, price } = req.body;

            // Verificar la disponibilidad del artículo basado en su tipo
            let itemAvailable;
            if (type === 'film') {
                // Buscar el artículo como una película
                itemAvailable = await Film.findById(item);
            } else if (type === 'serie') {
                // Buscar el artículo como una serie
                itemAvailable = await Serie.findById(item);
            } else {
                // Devolver un error si el tipo no es válido
                return res.status(400).json({ message: 'Tipo de artículo no válido' });
            }

            // Crear una nueva instancia de Booking
            const newBooking = new Booking({
                user: req.user._id, // ID del usuario que realiza la reserva
                type,              // Tipo de artículo (film o serie)
                film: type === 'film' ? item : null,  // ID de la película si es una película
                serie: type === 'serie' ? item : null, // ID de la serie si es una serie
                startDate,         // Fecha de inicio de la reserva
                endDate,           // Fecha de finalización de la reserva
                price              // Precio de la reserva
            });

            // Guardar la nueva reserva en la base de datos
            await newBooking.save();

            // Devolver una respuesta exitosa
            res.status(201).json({ message: 'Reserva creada exitosamente', booking: newBooking });
        } catch (error) {
            // Manejar errores y devolver una respuesta de error
            res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
        }
    },

    // Obtener reservas por usuario
    getBookingsByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookings = await Booking.find({ user: userId })
            .populate('film')
            .populate('serie')

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
        }
    },

    // Obtener una reserva específica
    getBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.findById(id)
                .populate('film')
                .populate('serie');

            if (!booking) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
        }
    },

    // Cancelar una reserva
    cancelBooking: async (req, res) => {
        try {
            const { id } = req.params;

            const booking = await Booking.findById(id);
            if (!booking) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            await Booking.findByIdAndDelete(id);

            res.status(200).json({ message: 'Booking cancelled successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error al cancelar la reserva', error: error.message });
        }
    },

    // Obtener todas las reservas
    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.find()
                .populate('film')
                .populate('user');
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
        }
    },

    updateBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const { startDate, endDate } = req.body;

            const findUdateBooking = await Booking.findByIdAndUpdate(id, { startDate, endDate }, { new: true });
            
            if (!findUdateBooking) {
                return res.status(404).json({ message: 'La reserva no se ha encontrado' });
            }
            res.status(200).json({ message: 'Reserva actualizada correctamente', booking: findUdateBooking });

        } catch (error) {
            es.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });
        }
    }
};

module.exports = bookingController;
