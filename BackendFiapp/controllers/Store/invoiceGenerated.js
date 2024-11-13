const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {Purchases, Customers, Products,PurchaseProducts,customerStore }= require ('../../ConnectionDB/Db.js')
const PDFDocument = require("pdfkit-table");

async function invoiceGenerated(req, res) {
    console.log("Datos recibidos:",req.body)
    const { fullName, idNumber, date, total, products, trusted, nameStore, storeId,generatePdf,  } = req.body;
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

        // Guardar productos en PurchaseProducts y actualizar cantidades en Products
        for (const product of products) {
            const { id, Amount, TotalPrice } = product;

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
                    return res.status(400).send(`Cantidad insuficiente para el producto ${id}`);
                }

                // Actualizar la cantidad del producto en Products
                await Products.update({ amount: newAmount }, { where: { id } });

                // Crear el registro en PurchaseProducts
                await PurchaseProducts.create({
                    purchaseId: purchaseId,
                    productId: id,
                    quantity: Amount,
                    totalPrice: TotalPrice,
                });
            } else {
                return res.status(404).send(`Producto no encontrado con ID ${id}`);
            }
        }
        // Generar el PDF solo si generatePdf es true
        let purchaseDocumentPath = null;
        if (generatePdf) {
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });
            const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
            await browser.close();

            // Guardar el PDF
            const fileName = `invoice_${Date.now()}.pdf`;
            const filePath = path.join(__dirname, '..', 'invoices', fileName);
            fs.writeFileSync(filePath, pdfBuffer);
            console.log(`PDF saved to: ${filePath}`);

            // Actualizar la compra con la ruta del documento
            purchaseDocumentPath = fileName;
            await Purchases.update(
                { purchaseDocument: purchaseDocumentPath },
                { where: { id: purchaseId } }
            );

            console.log(`Database updated for purchaseId: ${purchaseId}`);
        }

        res.status(200).json({ url: purchaseDocumentPath, fileName: purchaseDocumentPath });
    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).send('Error processing purchase');
    }
}
async function invoiceGetCustomer(req, res) {
    const idNumber = req.params.idNumber;
    const storeId = req.user.storeId;
    const purchaseId = req.params.purchaseId;
    console.log("Datos recibidos:", idNumber, storeId, purchaseId);

    if (!storeId) {
        return res.status(400).json({ error: 'ID de tienda no disponible' });
    }

    try {
        // Buscar al cliente por idNumber
        const customer = await Customers.findOne({
            where: { idNumber }
        });

        if (!customer) {
            return res.status(404).json({ error: `No se encontró un cliente con idNumber: ${idNumber}` });
        }

        // Buscar la compra específica asociada al customerId
        const purchase = await Purchases.findOne({
            where: { customerId: customer.id, id: purchaseId },
            include: [{
                model: Products,
                as: 'products', // Utiliza el alias que definiste en las relaciones (en este caso 'products')
                through: { attributes: ['quantity', 'totalPrice'] } // Incluye los datos de la tabla intermedia
            }]
        });
        if (!purchase) {
            return res.status(404).json({ error: `No se encontró la compra con ID: ${purchaseId} para el cliente.` });
        }
        // Crear un archivo PDF temporal
        const doc = new PDFDocument();
        const tempFilePath = path.join(__dirname, `temp_invoice_${purchaseId}.pdf`);
        const writeStream = fs.createWriteStream(tempFilePath);
        doc.pipe(writeStream);

        // Agregar datos de encabezado de la factura
        doc.fontSize(20).text(`Factura para el cliente: ${customer.fullName}`, { align: 'center' });
        doc.fontSize(12).text(`ID Cliente: ${customer.idNumber}`);
        doc.text(`Fecha: ${purchase.purchaseDate}`);
        doc.text(`Total: ${purchase.total}`);
        doc.text(`Fiado: ${purchase.trusted}`);
        doc.moveDown(); // Espacio entre encabezado y tabla

        // Configurar los datos de la tabla
        const tableData = {
            headers: ["Producto", "Cantidad", "Precio Unitario", "Total"],
            rows: purchase.products.map(product => [
                product.nameProduct,
                `${product.PurchaseProducts.quantity} ${product.unitType}`,
                product.salePrice.toFixed(2),
                product.PurchaseProducts.totalPrice.toFixed(2),
            ])
        };

        // Crear la tabla una vez con todos los productos
        doc.table(tableData, {
            prepareHeader: () => doc.fontSize(12).font("Helvetica-Bold"),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                doc.font("Helvetica").fontSize(10);
                if (indexRow % 2 === 0) {
                    doc.addBackground(rectRow, 'grey', 0.1); // Alternar color de fondo para filas pares
                }
            },
            columnsSize: [200, 100, 100, 100], // Anchos de columnas para la tabla
            padding: 5,
            x: 50, // Margen izquierdo
            y: doc.y + 10, // Posición después del encabezado
        });

        // Finalizar el documento
        doc.end();


        writeStream.on('finish', () => {
            res.download(tempFilePath, `invoice_${purchaseId}.pdf`, (err) => {
                // Eliminar el archivo temporal después de la descarga
                fs.unlink(tempFilePath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error al eliminar el archivo temporal:', unlinkErr);
                });
                if (err) console.error('Error al enviar la factura:', err);
            });
        });

    } catch (error) {
        console.error('Error al obtener la factura:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener la factura' });
    }
}



module.exports={
    invoiceGenerated,
    invoiceGetCustomer
}