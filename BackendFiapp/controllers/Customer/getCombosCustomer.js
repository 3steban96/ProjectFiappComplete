const { Combos, Products, ComboProducts, Customers, Store } = require('../../ConnectionDB/Db.js');

async function getCombosCustomerStore(req, res) {
    try {
      // Suponiendo que tienes el storeId del cliente en el token o en los parámetros de la solicitud
      const { customerId } = req.params; // O req.body o req.user dependiendo de tu estructura
  
      // Consultar todos los combos de la tienda asociada
      const combos = await Combos.findAll({
        where: { customerId }, // Filtrar por el storeId asociado
        include: [
          {
            model: Products,
            through: {
              model: ComboProducts,
              attributes: ['amount', 'unitType'], // Incluir los atributos necesarios de la tabla intermedia
            },
            attributes: ['id', 'nameProduct', 'salePrice', 'imgProduct'], // Incluir solo los atributos necesarios
          },
        ],
      });
  
      const formattedCombos = combos.map(combo => ({
        id: combo.id,
        name: combo.name,
        description: combo.description,
        discount: combo.discount,
        priceProducts: combo.priceProducts,
        totalDiscount: combo.totalDiscount,
        totalPriceCombo: combo.totalPriceCombo,
        startDate: combo.startDate,
        endDate: combo.endDate,
        imgProduct: combo.imgProduct ? combo.imgProduct.toString('base64') : null, // Convierte a base64 si es un BLOB
        products: combo.Products.map(product => ({
          id: product.id,
          nameProduct: product.nameProduct,
          amount: product.ComboProducts.amount,
          unitType: product.ComboProducts.unitType,
          salePrice: product.salePrice,
          imgProduct: product.imgProduct ? product.imgProduct.toString('base64') : null, // Convierte a base64 si es un BLOB
        })),
      }));
  
      res.status(200).json(formattedCombos);
    } catch (error) {
      console.error('Error fetching combos:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
  async function getCombosCustomerAllStore(req, res) {
    try {
        const { customerId } = req.params;

        // Encontrar todas las tiendas a las que está asociado el cliente
        const customer = await Customers.findByPk(customerId, {
            include: [{ model: Store, as: 'stores', attributes: ['id'] }] // Usamos el alias 'stores'
        });

        if (!customer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        console.log("Cliente encontrado:", customer.fullName);

        if (!customer.stores || customer.stores.length === 0) {
            console.log("El cliente no está asociado a ninguna tienda");
            return res.status(404).json({ error: 'El cliente no está asociado a ninguna tienda' });
        }

        const storeIds = customer.stores.map(store => store.id); // Usamos 'stores'
        console.log("storeIds:", storeIds);

        // Consultar todos los combos asociados a esas tiendas
        const combos = await Combos.findAll({
          include: [
            {
              model: Store,
              as: 'store', // Usar el alias 'store' en lugar de 'stores'
              where: { id: storeIds },
              attributes: ['nameStore']
            },
            {
              model: Products,
              through: { attributes: ['amount', 'unitType'] },
              attributes: ['id', 'nameProduct', 'salePrice', 'imgProduct'],
            },
          ],
        });       

        const comboNames = combos.map(combo => combo.name);
        console.log("Nombres de los combos:", comboNames);

        if (!combos || combos.length === 0) {
            console.log("No se encontraron combos para las tiendas asociadas");
            return res.status(404).json({ error: 'No se encontraron combos para las tiendas asociadas' });
        }

        const formattedCombos = combos.map(combo => ({
            id: combo.id,
            name: combo.name,
            nameStore: combo.store ? combo.store.nameStore : 'Nombre de tienda no disponible',
            description: combo.description,
            discount: combo.discount,
            priceProducts: combo.priceProducts,
            totalDiscount: combo.totalDiscount,
            totalPriceCombo: combo.totalPriceCombo,
            startDate: combo.startDate,
            endDate: combo.endDate,
            imgProduct: combo.imgProduct ? combo.imgProduct.toString('base64') : null,
            products: Array.isArray(combo.Products) && combo.Products.length > 0 ? 
                combo.Products.map(product => ({
                    id: product.id,
                    nameProduct: product.nameProduct,
                    amount: product.ComboProducts.amount,
                    unitType: product.ComboProducts.unitType,
                    salePrice: product.salePrice,
                    imgProduct: product.imgProduct ? product.imgProduct.toString('base64') : null,
                })) : []
        }));

        res.status(200).json(formattedCombos);
    } catch (error) {
        console.error('Error fetching combos:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
async function getCombosForCustomerByStore(req, res) {
  try {
      const { customerId, storeId } = req.params;

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

      // Consultar los combos asociados a la tienda específica
      const combos = await Combos.findAll({
          include: [
              {
                  model: Store,
                  as: 'store',
                  where: { id: storeId },
                  attributes: ['nameStore']
              },
              {
                  model: Products,
                  through: { attributes: ['amount', 'unitType'] },
                  attributes: ['id', 'nameProduct', 'salePrice', 'imgProduct'],
              },
          ],
      });

      if (!combos || combos.length === 0) {
          return res.status(404).json({ error: 'No se encontraron combos para la tienda seleccionada' });
      }

      // Formatear los combos para la respuesta
      const formattedCombos = combos.map(combo => ({
          id: combo.id,
          name: combo.name,
          nameStore: combo.store ? combo.store.nameStore : 'Nombre de tienda no disponible',
          description: combo.description,
          discount: combo.discount,
          priceProducts: combo.priceProducts,
          totalDiscount: combo.totalDiscount,
          totalPriceCombo: combo.totalPriceCombo,
          startDate: combo.startDate,
          endDate: combo.endDate,
          imgProduct: combo.imgProduct ? combo.imgProduct.toString('base64') : null,
          products: Array.isArray(combo.Products) && combo.Products.length > 0 ?
              combo.Products.map(product => ({
                  id: product.id,
                  nameProduct: product.nameProduct,
                  amount: product.ComboProducts.amount,
                  unitType: product.ComboProducts.unitType,
                  salePrice: product.salePrice,
                  imgProduct: product.imgProduct ? product.imgProduct.toString('base64') : null,
              })) : []
      }));

      res.status(200).json(formattedCombos);
  } catch (error) {
      console.error('Error fetching combos for the store:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}





  module.exports={
    getCombosCustomerStore,
    getCombosCustomerAllStore,
    getCombosForCustomerByStore
  }