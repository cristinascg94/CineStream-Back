const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Middleware para proteger rutas
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para el inicio de sesión
router.post('/login', userController.login);

// Ruta para actualizar el perfil de usuario
// Asegúrate de que solo usuarios logueados puedan acceder a esta ruta
router.patch('/update/:userId', protect, restrictToSelf, userController.updateProfile);

// Ruta para obtener todos los usuarios (solo admin)
router.get('/all', protect, restrictTo('admin'), userController.getUsers);

// Ruta para eliminar un usuario (solo admin)
router.delete('/:id', protect, restrictToSelf,  restrictTo('admin', 'user'), userController.deleteUser);

// obtener datos de un usuario. Solo para uno mismo en el area personal.
router.get('/:id', protect, restrictToSelf, userController.getUserById)

// Ruta para obtener información personal del usuario
router.get('/my-info/:id', protect, restrictTo('user', 'admin'), userController.getInfoByUser);

// // Ruta para actualizar rol del usuario (solo accesible para administradores)
router.patch('/role/:adminId', protect, restrictTo('admin'), userController.updateUserRole);



module.exports = router;
