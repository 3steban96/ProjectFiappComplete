const { Promotions, Products, ProductPromotions } = require('../../ConnectionDB/Db.js');
const { Op,where,Sequelize}= require('sequelize');
const cron = require('node-cron');

async function getPromotionsWithProducts (req, res) {
  try {
    const storeId = req.user.storeId; // `storeId` debe estar en `req.user`
    console.log("Id recibido de la tienda",storeId)
    if (!storeId) {
      return res.status(400).json({ error: 'ID de tienda no disponible' });
    }
    // Obtener todas las promociones activas y sus productos relacionados
    const promotions = await Promotions.findAll({
      where: { storeId: storeId },
      include: [
        {
          model: Products,
          through: {
            model: ProductPromotions,
            attributes: ['pricePromotion'], 
          },
          attributes: ['id', 'nameProduct', 'salePrice', 'imgProduct'], // Incluir solo los atributos necesarios
        },
      ],
    });

    // Formatear los datos para incluir las imágenes relacionadas
    const formattedPromotions = promotions.map(promotion => ({
      id: promotion.id,
      title: promotion.title,
      description: promotion.description,
      discount: promotion.discount,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      products: promotion.Products.map(product => {
        // Obtener el precio antes de la promoción desde la tabla intermedia
        const pricePromotion = product.ProductPromotions.pricePromotion;

        return {
          id: product.id,
          nameProduct: product.nameProduct,
          salePrice: product.salePrice,
          pricePromotion: pricePromotion,
          imgProduct: product.imgProduct ? product.imgProduct.toString('base64') : null, // Convertir imagen a base64
        };
      }),
    }));

    res.status(200).json(formattedPromotions);
  } catch (error) {
    console.error('Error fetching promotions with products:', error);
    res.status(500).json({ message: 'Error fetching promotions with products' });
  }
};

const createPromotion = async (req, res) => {
  try {
    const storeId = req.user.storeId; // `storeId` debe estar en `req.user`
    console.log("Id recibido de la tienda",storeId)
    if (!storeId) {
      return res.status(400).json({ error: 'ID de tienda no disponible' });
    }
    console.log("Datos recibidos:",req.body)
    const { title, description, discount, dateStart, dateEnd, selectedProductName } = req.body;
    // Crear la promoción
    const promotion = await Promotions.create({
      title,
      description,
      discount,
      startDate: new Date(dateStart),
      endDate: new Date(dateEnd),
      storeId: storeId,
    });

    // Buscar los productos seleccionados por nombre
    const products = await Products.findAll({      
      where: {
        nameProduct: selectedProductName,
        storeId: storeId,
      },
    });

    // Crear la relación con los productos y guardar el precio original
    await Promise.all(products.map(async (product) => {
      const newPrice = product.salePrice * (1 - discount / 100);
      await ProductPromotions.create({
        ProductId: product.id,
        PromotionId: promotion.id,
        pricePromotion: newPrice,
      });      
    }));

    res.status(201).json(promotion);
  } catch (error) {
    console.error('Error creating promotion:', error);
    res.status(500).json({ message: 'Error creating promotion' });
  }
};
const revertProductPrices = async () => {
    try {
      // Obtener promociones expiradas
      const promotions = await Promotions.findAll({
        where: {
          endDate: {
            [Op.lt]: new Date(),
          },
        },
        include: {
          model: Products,
          through: {
            model: ProductPromotions,
          },
        },
      });
  
      // Revertir los precios de los productos
      await Promise.all(promotions.map(async (promotion) => {
        await Promise.all(promotion.Products.map(async (product) => {
          const productPromotion = await ProductPromotions.findOne({
            where: {
              ProductId: product.id,
              PromotionId: promotion.id,
            },
          });
  
          // Revertir el precio
          await product.update({ salePrice: productPromotion.pricePromotion });
  
          // Eliminar la relación
          await productPromotion.destroy();
        }));
  
        // Eliminar la promoción
        await promotion.destroy();
      }));
    } catch (error) {
      console.error('Error reverting product prices:', error);
    }
  };
  
  // Programar el cron job para ejecutarse diariamente a medianoche
  cron.schedule('0 0 * * *', revertProductPrices);
module.exports = {
  getPromotionsWithProducts,
  revertProductPrices,
  createPromotion,
};
