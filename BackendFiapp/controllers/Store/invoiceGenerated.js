const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {Purchases, Customers, Products }= require ('../../ConnectionDB/Db.js')

async function invoiceGenerated(req, res) {
    console.log("Datos recibidos:",req.body)
    const { fullName, idNumber, date, total, products, trusted, nameStore, storeId } = req.body;
    const htmlContent = `
    <html>
        <head>   
            <style>
                @page {
                size: A4;
                margin: 0;
                }

                body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                }

                .invoice {
                width: 100%;
                padding: 20mm;
                box-sizing: border-box;
                }

                .invoice h1 {
                text-align: center;
                font-size: 24px;
                }

                .invoice p {
                margin: 0;
                padding: 5px 0;
                font-size: 12px;
                }

                .invoice table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                }

                .invoice table, .invoice th, .invoice td {
                padding: 8px;
                }

                .invoice th {
                border-bottom: 2px  solid #000000;
                text-align: left;
                }

                .invoice td {
                text-align: left;
                }

                .dataBill {
                flex-direction: row;
                display: flex; 
                justify-content: space-between;
                }
                
                .dataBill > div p {
                font-size: large;
                font-weight: bold;
                }

                .titleBill {
                flex-direction: row; 
                display: flex; 
                justify-content: center;
                }
            </style>      
        </head>
        <body>
            <div class="invoice">
                <div class="titleBill">
                    <h1>Factura</h1>
                </div>
                <div class="dataBill">
                    <div style="flex-direction: column;">
                        <p>Tienda: ${nameStore}</p>
                        <p>Nombre del Cliente: ${fullName}</p>        
                        <p>Numero de identificación: ${idNumber}</p>        
                    </div>
                    <div style="flex-direction: column;">            
                        <p>Fecha: ${date}</p>
                    </div>
                    <div style="flex-direction: column;">            
                        <p>Fiado: ${trusted ?'Si':'No'}</p>

                    </div>
                </div>

                <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Producto</th>
                    <th>Und/Peso</th>
                    <th>Precio</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map((product, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${product.Producto}</td>
                            <td>${product.Amount}</td>
                            <td>${product.Prc_Und}</td>
                            <td>${product.TotalPrice}</td>
                        </tr>`).join('')}
                </tbody>
                </table>
                <p style="text-align: end;">Total: ${total}</p>
            </div>
        </body>
    </html>
    `;
    try {
        // Buscar el cliente
        const customer = await Customers.findOne({ where: { fullName: fullName } });
        if (!customer) {
            return res.status(404).send('Cliente no encontrado');
        }

        // Crear una nueva compra
        const newPurchase = await Purchases.create({
            total,
            trusted,
            purchaseDate: date,
            customerId: customer.id,
            storeId: storeId
        });

        const purchaseId = newPurchase.id;
        console.log(`Generated new purchase with ID: ${purchaseId}`);

        // Actualizar las cantidades de los productos
        for (const product of products) {
            const { id, Amount } = product;  // Use `Amount` instead of `quantity`

            // Encontrar el producto
            const productRecord = await Products.findOne({ where: { id } });
            if (productRecord) {
                const currentAmount = Number(productRecord.amount);
                const quantityToSubtract = Number(Amount);

                if (isNaN(currentAmount) || isNaN(quantityToSubtract)) {
                    console.error(`Invalid data types for product ID ${id}: amount=${productRecord.amount}, Amount=${Amount}`);
                    return res.status(400).send(`Invalid data types for product ${id}`);
                }

                const newAmount = currentAmount - quantityToSubtract;

                if (newAmount < 0) {
                    // Si la cantidad es insuficiente
                    return res.status(400).send(`Cantidad insuficiente para el producto ${id}`);
                }

                // Actualizar la cantidad del producto
                await Products.update(
                    { amount: newAmount },
                    { where: { id } }
                );
            } else {
                // Si el producto no se encuentra
                return res.status(404).send(`Producto no encontrado con ID ${id}`);
            }
        }

        // Generar el PDF
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        // Guardar el PDF
        const fileName = `invoice_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, '..', 'invoices', fileName);
        fs.writeFileSync(filePath, pdfBuffer);
        console.log(`PDF saved to: ${filePath}`);

        // Actualizar la compra con la ruta del documento
        const purchaseDocumentPath = `${fileName}`;
        await Purchases.update(
            { purchaseDocument: purchaseDocumentPath },
            { where: { id: purchaseId } }
        );

        console.log(`Database updated for purchaseId: ${purchaseId}`);

        res.status(200).json({ url: purchaseDocumentPath, fileName });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
}
async function invoiceGetCustomer(req, res) {
    const idNumber = req.params.idNumber;
    const invoiceFileName = req.params.fileName;
    const storeId = req.user.storeId; // storeId debe estar en req.user
    console.log("Id recibido de la tienda",storeId)
    if (!storeId) {
      return res.status(400).json({ error: 'ID de tienda no disponible' });
    }
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
    invoiceGenerated,
    invoiceGetCustomer
}