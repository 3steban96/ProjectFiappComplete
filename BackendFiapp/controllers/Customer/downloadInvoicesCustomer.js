const {Purchases, Customers, Products }= require ('../../ConnectionDB/Db.js')
const path = require('path');
const fs = require('fs');

async function invoiceDownloadCustomer(req, res) {
    const idNumber = req.params.idNumber;
    const invoiceFileName = req.params.fileName;
    try {
        // Buscar al cliente por idNumber
        const customer = await Customers.findOne({
            where: { idNumber: idNumber }
        });

        if (!customer) {
            return res.status(404).json({ error: `No se encontró un cliente con idNumber: ${idNumber}` });
        }

        // Buscar las compras asociadas al customerId del cliente
        const purchases = await Purchases.findAll({
            where: { customerId: customer.id } // Buscar por customerId
        });

        if (purchases.length === 0) {
            return res.status(404).json({ error:` No se encontraron compras para el cliente con idNumber: ${idNumber}` });
        }

        // Ruta del archivo de la factura
        const invoicePath = path.join(__dirname, '..', 'invoices', invoiceFileName);

        // Verifica si el archivo existe
        if (!fs.existsSync(invoicePath)) {
            return res.status(404).json({ error: `No se encontró el archivo de la factura: ${invoiceFileName}` });
        }

        res.download(invoicePath, invoiceFileName, (err) => {
            if (err) {
                console.error('Error al descargar la factura:', err);
                return res.status(500).json({ error: 'Error al descargar la factura' });
            } else {
                console.log(`Factura ${invoiceFileName} enviada correctamente`);
            }
        });
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        return res.status(500).json({ error: 'Error interno del servidor al obtener las facturas' });
    }
}
module.exports={
    invoiceDownloadCustomer
}