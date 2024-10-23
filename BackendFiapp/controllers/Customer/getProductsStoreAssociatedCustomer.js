const { Products, Customers, Store } = require('../../ConnectionDB/Db.js');

async function getProductsStoreAssociatedCustomer(req, res) {
  try {
    const { customerId, storeId, category } = req.params;
    // const { category } = req.query; // Obtener la categoría desde el query params (en el frontend puedes enviar la categoría en los query params)
    console.log("Categoria seleccionada", category)
    console.log("Cliente", customerId)
    console.log("Tienda", storeId)
    // Encontrar si el cliente está asociado a la tienda específica
    const customer = await Customers.findByPk(customerId, {
      include: [{ model: Store, as: 'stores', attributes: ['id'] }]
    });

    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (!customer.stores || customer.stores.length === 0) {
      return res.status(404).json({ error: 'El cliente no está asociado a ninguna tienda' });
    }

    // Verificar si el cliente está asociado a la tienda seleccionada
    const storeIds = customer.stores.map(store => store.id);
    if (!storeIds.includes(parseInt(storeId))) {
      return res.status(404).json({ error: 'El cliente no está asociado a la tienda seleccionada' });
    }

    // Consultar los productos asociados a la tienda específica y filtrar por categoría
    const products = await Products.findAll({
      where: category ? { category } : {}, // Filtrar por categoría si se proporciona
      include: [
        {
          model: Store,
          where: { id: storeId },
          attributes: ['nameStore']
        },
      ],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos para la tienda y categoría seleccionadas' });
    }

    // Convertir las imágenes de los productos a base64
    const productsWithImages = products.map(product => {
      return {
        ...product.dataValues,
        imgProduct: product.imgProduct ? `data:image/png;base64,${product.imgProduct.toString('base64')}` : null,
      };
    });

    return res.status(200).json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products for the store:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  getProductsStoreAssociatedCustomer
};
