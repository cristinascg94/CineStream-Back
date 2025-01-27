const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// el protect es para que registrar usuarios. Solo los usuarios registrados podrán acceder a las rutas
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'No estás autorizado para acceder a esta ruta' });
    }

    try {
        const decoded = jwt.verify(token, 'tu_super_secreto'); // Asegúrate de cambiar 'tu_super_secreto' con tu clave secreta de JWT.

        const currentUser = await User.findById(decoded.userId);
        console.log(currentUser);
        console.log(decoded.userId);
        if (!currentUser) {
            return res.status(401).json({ message: 'El usuario al que pertenece este token ya no existe' });

        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido', error: error.message });
    }
};

// bloqueo de acceso a las rutas por roles. Si eres administrador puedes modificar precios o el catalogo de choches, o las reservas
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
        }
        next();
    };
};
// yo usuario logueado puedo ver mis cosas: mis reservas. El usuario accede a un recurso suyo propio
const restrictToSelf = (req, res, next) => {
    const userId = req.user._id; // ID del usuario autenticado
    const paramId = req.params.userId; // ID del usuario en la ruta
    console.log(paramId);
    console.log(userId.toString());


    if (userId.toString() !== paramId && req.user.role !== "admin") {
        return res.status(403).json({ message: "No tienes permiso para acceder a este recurso."});
    }

    next();
};

module.exports = { protect,restrictTo,restrictToSelf };
