const {Store} = require('../../ConnectionDB/Db');
const jwt = require('jsonwebtoken');
const nodemailer =require('nodemailer');
const bcrypt = require('bcrypt');
const { Op }= require('sequelize');

async function recoveryPasswordStore(req, res) {
    try {
        const { email } = req.body;
        const store = await Store.findOne({ where: { email } });
        
        if (!store) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generar un código de 6 dígitos
        const recoveryCode = Math.floor(100000 + Math.random() * 900000);
        const recoveryCodeString = recoveryCode.toString();
        const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
    
        // Guardar el código temporalmente en la base de datos (asegúrate de tener este campo en tu modelo)
        store.resetPasswordExpires = expirationDate;

        store.recoveryCode = recoveryCodeString;
        await store.save();

        // Configurar el transporte de correo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // Configurar las opciones del correo
        const mailOptions = {
            from: process.env.EMAIL,
            to: store.email,
            subject: 'Recuperación de contraseña de tu cuenta Fiapp',
            text: `Tu código de recuperación es: ${recoveryCode}. Ingresa este código en tu aplicación móvil para continuar con el restablecimiento de la contraseña.`
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Correo de recuperación de contraseña enviado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al enviar el correo de recuperación' });
    }
}

async function resetPasswordStore(req, res) {
    const { recoveryCode, newPassword } = req.body;

    try {
        // Convertir el código de recuperación a string explícitamente
        const store = await Store.findOne({
            where: {
                recoveryCode: recoveryCode.toString(), // Convertimos el código a string
                resetPasswordExpires: { [Op.gt]: Date.now() } // Verifica que no haya expirado
            }
        });

        if (!store) {
            return res.status(400).json({ message: 'Código de recuperación inválido o expirado' });
        }

        store.password = newPassword;
        // Limpia el código de recuperación y la fecha de expiración
        store.recoveryCode = null;
        store.resetPasswordExpires = null;
        await store.save();
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error('Error en la actualizacion de contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error });
    }
}


module.exports={
    recoveryPasswordStore,
    resetPasswordStore
}