const { Products, Customers, Store, Promotions, ProductPromotions } = require('../../ConnectionDB/Db.js');

async function getProductsStoreAssociatedCustomer(req, res) {
  try {
    const { customerId, storeId, category } = req.params;
    console.log("Categoria seleccionada", category);
    console.log("Cliente", customerId);
    console.log("Tienda", storeId);

    // Verificar si el cliente está asociado a la tienda específica
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
        {
          model: Promotions,
          through: {
            model: ProductPromotions,
            attributes: ['pricePromotion'], // Asegurarse de incluir el precio de promoción
          },
          attributes: ['title'] // Agregar atributos de Promotions si los necesitas
        }
      ]
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos para la tienda y categoría seleccionadas' });
    }

    // Convertir las imágenes de los productos a base64 y ajustar el precio
    const productsWithImages = products.map(product => {
      const hasPromotion = product.Promotions && product.Promotions.length > 0;
      return {
        ...product.dataValues,
        imgProduct: product.imgProduct ? `data:image/png;base64,${product.imgProduct.toString('base64')}` : null,
        price: hasPromotion ? product.Promotions[0].ProductPromotions.pricePromotion : product.salePrice // usa el precio de promoción si existe
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
