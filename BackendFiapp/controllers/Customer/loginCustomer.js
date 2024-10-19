const { Customers }= require ('../../ConnectionDB/Db.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');

async function loginCustomer(req, res) {
    try {
      const { email, password } = req.body;
  
      // Verificación de campos obligatorios
      if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, ingrese correo electrónico y contraseña' });
      }
  
      // Buscar el cliente por email
      const customer = await Customers.findOne({ where: { email } });
      if (!customer) {
        return res.status(400).json({ error: 'El cliente no existe' });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }
      const qrCodeBase64 = customer.qrCode ? customer.qrCode.toString('base64') : null;      // Crear un token JWT (opcional, pero recomendado para autenticación)
      const token = jwt.sign(
        { id: customer.id, email: customer.email },
        process.env.JWT_SECRET || '7801996', // Usa una clave secreta en tus variables de entorno
        { expiresIn: '1h' }
      );
      // Enviar la respuesta con el token y los datos del cliente
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        customer: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,          
          qrCode: qrCodeBase64,
        }
      });
    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

module.exports = loginCustomer;
