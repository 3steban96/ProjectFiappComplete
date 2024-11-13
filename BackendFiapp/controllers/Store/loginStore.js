const { Store }= require ('../../ConnectionDB/Db.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');

async function loginStore(req, res) {
    try {
      const { email, password } = req.body;
      console.log("Datos ingresados",req.body)
      // Verificación de campos obligatorios
      if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, ingrese correo electrónico y contraseña' });
      }
  
      // Buscar el cliente por email
      const store = await Store.findOne({ where: { email } });
      if (!store) {
        return res.status(400).json({ error: 'La tienda no existe' });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, store.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({
          storeId: store.id, 
          email: store.email 
        },
        process.env.JWT_SECRET || '7801996', // Usa una clave secreta en tus variables de entorno
        { expiresIn: '1h' }
      );
      console.log('Datos del store:', {
        id: store.id,
        nameStore: store.nameStore,
        email: store.email
      });
      // Enviar la respuesta con el token y los datos del cliente
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        store: {
          id: store.id,
          nameStore: store.nameStore,
          email: store.email,          
        }
      });
    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

module.exports = loginStore;
