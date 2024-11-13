const { where } = require('sequelize');
const { Store, Customers, CustomerStore, Payment }= require ('../../ConnectionDB/Db.js')

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
// Función para registrar un abono y actualizar el saldo pendiente
async function addPayment(req, res) {
  try {
    const { storeId, idNumber, paymentAmount, paymentMethod, paymentFile } = req.body;

    if (!storeId || !idNumber || paymentAmount == null || !paymentMethod) {
      return res.status(400).json({ error: "Faltan campos obligatorios en la solicitud (storeId, idNumber, paymentAmount, paymentMethod)" });
    }

    // Verifica la existencia de la tienda y el cliente
    const store = await Store.findByPk(storeId);
    const customer = await Customers.findOne({ where: { idNumber } });

    if (!store || !customer) {
      return res.status(404).json({ error: "Tienda o cliente no encontrado" });
    }

    // Encuentra la asociación entre el cliente y la tienda
    const customerStore = await CustomerStore.findOne({
      where: {
        storeId: store.id,
        customerId: customer.id,
      },
    });

    if (!customerStore) {
      return res.status(404).json({ error: "El cliente no está asociado a esta tienda" });
    }

    // Calcula el nuevo saldo pendiente
    const newBalance = customerStore.storeCreditBalance - paymentAmount;

    // Verifica que el saldo no sea negativo
    if (newBalance < 0) {
      return res.status(400).json({ error: "El abono excede el saldo pendiente" });
    }

    // Actualiza el saldo en la tabla CustomerStore
    customerStore.storeCreditBalance = newBalance;
    await customerStore.save();

    // Crea un nuevo registro de pago en la tabla Payment
    const payment = await Payment.create({
      customerStoreId: customerStore.id,
      paymentAmount,
      paymentMethod,
      datePayment: new Date(),
      paymentFile, // Se espera que el archivo esté en base64 o buffer
    });

    return res.status(200).json({
      message: "Abono registrado exitosamente",
      newBalance,
      payment: {
        paymentAmount: payment.paymentAmount,
        paymentMethod: payment.paymentMethod,
        datePayment: payment.datePayment,
      }
    });
  } catch (error) {
    console.error('Error al registrar el abono:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
module.exports={
  associateCustomerToStore,
  updateCreditLimit,
  addPayment
}