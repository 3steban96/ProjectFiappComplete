const {Customers} = require('../../ConnectionDB/Db');
const nodemailer =require('nodemailer');
const bcrypt = require('bcrypt');
const { Op }= require('sequelize');

async function recoveryPasswordCustomer(req, res) {
    try {
        console.log("email",req.body)
        const { email } = req.body;
        const customer = await Customers.findOne({ where: { email} });
        
        if (!customer) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generar un código de 6 dígitos
        const recoveryCode = Math.floor(100000 + Math.random() * 900000);
        const recoveryCodeString = recoveryCode.toString();
        const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
    
        // Guardar el código temporalmente en la base de datos (asegúrate de tener este campo en tu modelo)
        customer.resetPasswordExpires = expirationDate;

        customer.recoveryCode = recoveryCodeString;
        await customer.save();

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
            to: customer.email,
            subject: 'Recuperación de contraseña de tu cuenta Fiapp',
            text: `Tu código de recuperación es: ${recoveryCode}. Ingresa este código en tu aplicación móvil para continuar con el restablecimiento de la contraseña.`
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Correo de recuperación de contraseña enviado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al enviar el correo de recuperación',error });
    }
}

async function resetPasswordCustomer(req, res) {
    const { recoveryCode, newPassword } = req.body;

    try {
        // Convertir el código de recuperación a string explícitamente
        const customer = await Customer.findOne({
            where: {
                recoveryCode: recoveryCode.toString(), // Convertimos el código a string
                resetPasswordExpires: { [Op.gt]: Date.now() } // Verifica que no haya expirado
            }
        });

        if (!customer) {
            return res.status(400).json({ message: 'Código de recuperación inválido o expirado' });
        }

        customer.password = newPassword;
        // Limpia el código de recuperación y la fecha de expiración
        customer.recoveryCode = null;
        customer.resetPasswordExpires = null;
        await customer.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error });
    }
}


module.exports={
    recoveryPasswordCustomer,
    resetPasswordCustomer
}