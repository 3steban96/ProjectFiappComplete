const { Op,where,Sequelize}= require('sequelize');
const {Customers }= require ('../../ConnectionDB/Db.js')
const QRCode = require('qrcode');

async function registerCustomer(req, res) {
    try {
        console.log("Datos recibidos:",req.body)
        const { fullNameC, typeDocumentC, idNumberC, emailC, phoneC, passwordC } = req.body;
  
        // Verificación de campos obligatorios
        if (!fullNameC || !typeDocumentC || !idNumberC || !emailC || !phoneC || !passwordC) {
            return res.status(400).json({ error: "Faltan campos obligatorios en la solicitud" });
        }
  
        let customer = await Customers.findOne({
            where: { idNumber: idNumberC }
        });
  
        if (customer) {
            return res.status(400).json({ error: "El cliente ya existe" });
        } else {          
          // Generar un identificador único para el QR
            // const qrIdentifier = uuidv4();
            const qrData = `${idNumberC}`;
  
            // Generar el QR Code como una cadena base64
            const qrCodeBase64 = await QRCode.toDataURL(qrData);
  
            // Guardar la cadena base64 en la base de datos
  
            // Crear el cliente sin el QR Code inicialmente
            customer = await Customers.create({
                fullName: fullNameC,
                typeDocument: typeDocumentC,
                idNumber: idNumberC,
                email: emailC,
                phone: phoneC,
                password: passwordC,
                qrCode: qrCodeBase64
            });
  
            return res.status(201).json({ message: "Cliente creado exitosamente", customer });
        }
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
module.exports={
    registerCustomer,
}