// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Para comparar contraseñas cifradas
const bcrypt = require('bcrypt'); 
// Librería de manejo de JWT
const jwt = require('jsonwebtoken');
// Importar fichero de configuración con variables de entorno
const config = require('../config/config.js');

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo user
const User = models.users;

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json(Respuesta.error(null, "Usuario no encontrado"));
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(401)
          .json(Respuesta.error(null, "Password incorrecta"));
      }

      // Generar el token JWT
      const token = jwt.sign(
        {
          sub: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        },
       config.secretKey,
        { expiresIn: "1h" }
      );

      // Configurar la cookie con el token
      res.cookie("token", token, {
        httpOnly: true, // Evita que JavaScript acceda a la cookie
        secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : 'Lax', // Protección CSRF // Lax en desarrollo
        maxAge: 3600000, // 1 hora en milisegundos
        // domain: "localhost",
      });


      //Eliminar la contraseña del objeto de respuesta
      delete user.dataValues.password;
      
      res.status(200).json(Respuesta.exito(user, "Inicio de sesión exitoso"));
    } catch (err) {
      console.error(err);
      res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  }

  async signup(req, res) {
    const { username, email, password } = req.body;

    try {
      // Validar si todos los campos fueron proporcionados
      if (!username || !email || !password) {
        return res
          .status(400)
          .json(Respuesta.error(null,"Faltan campos por informar" ));
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json(Respuesta.error(null,"Ya existe un usuario con ese correo electrónico." ) );
      }

      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10); // 10 es el nivel de "salting" (puedes ajustarlo)

      // Crear el nuevo usuario
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword, // Guardamos la contraseña cifrada
      });

      // Responder con éxito
      delete newUser.dataValues.password; // Eliminar la contraseña del objeto de respuesta
      res.status(201).json(Respuesta.exito( newUser, "Usuario registrado exitosamente"));

    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      res
        .status(500)
        .json(Respuesta.error(null, "Error al registrar el usuario, intenta nuevamente")); 
    }
  }

  /**
   * Logs out the user by clearing the authentication token cookie.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {void}
   */
  async logout(req, res) {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json(Respuesta.exito( null, "Cierre de sesión exitoso"));
};

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(Respuesta.exito(users));
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json(Respuesta.error(null, "Error al obtener los usuarios"));
    }
  }
}

module.exports = new UserController();