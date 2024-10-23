const  axios  = require("axios");
const { Op,where,Sequelize}= require('sequelize');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const {Customers, Purchases, Store }= require ('../../ConnectionDB/Db.js')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

async function getCustomers(req, res) {
  try {
    const storeId = req.user.storeId;
    console.log("Id tienda recibido", storeId);

    if (!storeId) {
      return res.status(400).json({ error: 'Id de la tienda no disponible' });
    }

    // Incluyendo también el storeCreditLimit de la tabla intermedia CustomerStore
    const dbCustomers = await Customers.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Store,
          as: 'stores', // Relación a través de CustomerStore
          where: { id: storeId },
          through: { 
            attributes: ['storeCreditLimit'] // Atributos de la tabla CustomerStore
          }
        },
        {
          model: Store,
          as: 'ratedStores', // Relación a través de CustomerRatings
          through: { 
            attributes: ['rating'] // Atributos de la tabla CustomerRatings
          }
        }
      ],
      order: [['fullName', 'ASC']],
    });

    console.log("Clientes obtenidos:", dbCustomers);
    return res.status(200).json(dbCustomers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function getCustomerInvoicesForStore(req, res) {
  try {
    const { customerId } = req.params;
    const storeId = req.headers.storeid; // Asegúrate de que el storeId venga en el header
    
    if (!storeId || !customerId) {
      return res.status(400).json({ error: 'ID de tienda o cliente no disponible' });
    }

    // Obtener las facturas del cliente específico en una tienda determinada
    const invoices = await Purchases.findAll({
      where: {
        customerId,
        storeId
      },
    });

    if (invoices.length === 0) {
      return res.status(404).json({ message: 'No se encontraron facturas para este cliente en la tienda especificada' });
    }

    return res.status(200).json(invoices);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function deleteCustomer(req, res) {
    try {
        const { nameC } = req.query;

        if (!nameC) {
            return res.status(400).json({ error: 'El nombre del cliente es requerido' });
        }

        const result = await Customers.destroy({
            where: {
                name: nameC
            }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'No se encontró el registro del cliente' });
        }

        return res.status(200).json({ message: 'El registro se ha eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
module.exports={
    getCustomers,
    getCustomerInvoicesForStore,
    deleteCustomer,    
}