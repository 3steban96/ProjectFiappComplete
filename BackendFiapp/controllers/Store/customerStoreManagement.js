const { where } = require('sequelize');
const { Store, Customers, CustomerStore }= require ('../../ConnectionDB/Db.js')

async function associateCustomerToStore(req, res) {
  try {
    console.log(req.body);
    const { storeId, idNumber } = req.body;

    if (!storeId || !idNumber) {
      return res.status(400).json({ error: "Faltan campos obligatorios en la solicitud" });
    }

    const store = await Store.findByPk(storeId);
    const customer = await Customers.findOne({ where: { idNumber: idNumber } });

    if (!store || !customer) {
      return res.status(404).json({ error: "Tienda o cliente no encontrado" });
    }

    console.log('Store:', store);
    console.log('Customer:', customer);

    // Verifica si hay alguna relación existente entre la tienda y el cliente
    const existingAssociation = await store.hasCustomer(customer);

    if (existingAssociation) {
      return res.status(409).json({ message: "El cliente ya está asociado con esta tienda" }); // Cambiado a 409
    }

    await store.addCustomer(customer);
    console.log('Cliente asociado exitosamente');

    // Incluye el fullName del cliente en la respuesta
    return res.status(200).json({ 
      message: "Cliente asociado exitosamente a la tienda",
      fullName: customer.fullName  // Asegúrate de que el campo fullName esté en el modelo Customers
    });
  } catch (error) {
    console.error('Error al asociar cliente:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
async function updateCreditLimit(req, res) {
  try {
    const { storeId, idNumber, storeCreditLimit } = req.body;

    if (!storeId || !idNumber || storeCreditLimit == null) {
      return res.status(400).json({ error: "Faltan campos obligatorios en la solicitud (storeId, idNumber, storeCreditLimit)" });
    }

    const store = await Store.findByPk(storeId);
    const customer = await Customers.findOne({ where: { idNumber: idNumber } });

    if (!store || !customer) {
      return res.status(404).json({ error: "Tienda o cliente no encontrado" });
    }

    // Verifica si el cliente ya está asociado a la tienda
    const existingAssociation = await store.hasCustomer(customer);
    if (!existingAssociation) {
      return res.status(404).json({ error: "El cliente no está asociado a esta tienda" });
    }

    // Actualiza el cupo de crédito en la tabla intermedia
    await store.addCustomer(customer, {
      through: { storeCreditLimit }
    });

    return res.status(200).json({ message: "Cupo de crédito actualizado exitosamente" });
  } catch (error) {
    console.error('Error al actualizar el cupo de crédito:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}  
async function calculateTotalStoreCredit(customerId) {
  const associations = await CustomerStore.findAll({ where: { customerId } });
  return associations.reduce((sum, association) => sum + association.storeCreditLimit, 0);
}
async function rateCustomer(req, res) {
try {
    const { storeId, customerId, rating } = req.body;

    if (!storeId || !customerId || !rating) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Validar si la tienda y el cliente existen
    const store = await Store.findByPk(storeId);
    const customer = await Customers.findByPk(customerId);

    if (!store || !customer) {
    return res.status(404).json({ error: "Tienda o cliente no encontrado" });
    }

    // Verificar si ya existe una calificación previa
    const existingRating = await CustomerRatings.findOne({
    where: { storeId, customerId },
    });

    if (existingRating) {
    // Si ya existe una calificación, puedes actualizarla
    existingRating.rating = rating;
    await existingRating.save();
    return res.status(200).json({ message: "Calificación actualizada exitosamente" });
    }

    // Si no existe una calificación previa, crear una nueva
    await CustomerRatings.create({
    storeId,
    customerId,
    rating,
    });

    return res.status(201).json({ message: "Calificación creada exitosamente" });
} catch (error) {
    console.error('Error al calificar cliente:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}
} 

module.exports={
  associateCustomerToStore,
  updateCreditLimit,
  rateCustomer, 
}