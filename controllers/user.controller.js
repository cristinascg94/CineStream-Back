const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Booking = require('../models/booking.model')
const bcrypt = require('bcrypt');
// Configurar JWT
const JWT_SECRET = 'tu_super_secreto'; // Este debe estar en una variable de entorno
const JWT_EXPIRES_IN = '90d';

const userController = {
    // Registro de usuario
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const newUser = new User({
                name,
                email,
                password: password,
                role: 'user'
            });

            await newUser.save();
            res.status(201).send({ message: 'Usuario registrado con éxito', userId: newUser._id });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    },

    // Inicio de sesión
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.status(200).json({ message: 'Login exitoso', token, id: user._id, role: user.role });
        } catch (error) {
            res.status(500).json({ message: 'Error en el login', error: error.message });
        }
    },

    // Actualizar perfil del usuario
    updateProfile: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email } = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Perfil actualizado con éxito', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
        }
    },
    // Actualizar rol del usuario
    updateUserRole: async (req, res) => {
        try {
            const { userId, role } = req.body;

            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({ message: 'Rol no válido' });
            }

            const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Rol actualizado con éxito', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
        }
    },

    // obtener todos los usuarios
    getUsers: async (req, res) =>{
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).son({ message: 'Error al obtener los usuarios', error: error.message });
        }
    },
     // Obtener la informacion personal del usuario
     getInfoByUser: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la información del usuario', error: error.message });
        }
    },
    
    // eliminar un usuario por ID
    deleteUser: async(req, res) =>{
        try {
            const { userId } =req.params;
            console.log(userId);
            const deleteUser = await User.findByIdAndDelete(userId);
            console.log(deleteUser);

            if (!deleteUser) {
                return res.status (404).json({message: 'Usuario no encontrado'});
            }
            // Eliminar las reservas asociadas al usuario
            await Booking.deleteMany({ user: userId });

            res.status(200).json({message:'Usuario y sus reservas eliminados exitosamente'});
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
        }
    },
    // obtener los datos de un usuario. para la parte de area personar
    getUserById: async (req, res) =>{
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(user).json({message:'Usuario encontrado exitosamente'});
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { userId } = req.params;
            const { password } = req.body;
    
            // Verificar si la nueva contraseña ha sido proporcionada
            if (!password) {
                return res.status(400).json({ message: 'La nueva contraseña es requerida' });
            }
    
            // Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Actualizar la contraseña del usuario en la base de datos
            const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            res.status(200).json({ message: 'Contraseña actualizada con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la contraseña', error: error.message });
        }
    }
};

module.exports = userController;