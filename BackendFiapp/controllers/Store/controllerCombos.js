const { Combos, Products,ComboProducts, Stores } = require('../../ConnectionDB/Db.js');
const sharp = require('sharp');
const { Op } = require('sequelize');
const cron = require('node-cron');

async function getCombos(req, res) {
  try {
    const storeId = req.user.storeId; // `storeId` debe estar en `req.user`
    console.log("Id recibido de la tienda",storeId)
    if (!storeId) {
      return res.status(400).json({ error: 'ID de tienda no disponible' });
    }
    // Consultar todos los combos en la base de datos
    const combos = await Combos.findAll({
      where: { storeId: storeId },
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
    // console.log(formattedCombos)
    res.status(200).json(formattedCombos);
  } catch (error) {
    console.error('Error fetching combos:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

// async function postCombos(req, res) {
//   console.log(req.body);
//   try {
//     const { name, description, startDate, endDate, discount, totalPriceProducts, totalPriceCombo, productIds } = req.body;

//     // Verificar si req.user tiene storeId
//     if (!req.user || !req.user.storeId) {
//       return res.status(401).json({ error: 'Unauthorized: storeId is missing' });
//     }
//     const storeId = req.user.storeId;

//     // Validar los datos de entrada
//     if (!name || !totalPriceProducts || !productIds) {
//       return res.status(400).json({ error: 'Invalid input data' });
//     }

//     // Parsear productIds
//     let productData;
//     try {
//       productData = JSON.parse(productIds);
//       if (!Array.isArray(productData)) {
//         return res.status(400).json({ error: 'Invalid productIds format' });
//       }
//     } catch (error) {
//       return res.status(400).json({ error: 'Invalid JSON format for productIds' });
//     }

//     // Verificar si el combo ya existe en esa tienda
//     let combo = await Combos.findOne({ where: { name, storeId } });

//     if (combo) {
//       return res.status(400).json({ error: 'El combo ya existe en esta tienda' });
//     }

//     const productIdsArray = productData.map(product => product.id);
//     const products = await Products.findAll({ where: { id: productIdsArray } });

//     if (products.length !== productIdsArray.length) {
//       return res.status(400).json({ error: 'One or more product IDs are invalid' });
//     }

//     // Procesar la imagen
//     let imgProductBase64 = null;
//     if (req.file) {
//       const webpImageBuffer = await sharp(req.file.buffer).webp().toBuffer();
//       imgProductBase64 = webpImageBuffer.toString('base64');
//     }

//     // Crear el nuevo combo
//     const newCombo = await Combos.create({
//       name,
//       description,
//       imgProduct: imgProductBase64 ? Buffer.from(imgProductBase64, 'base64') : null,
//       startDate,
//       endDate,
//       discount,
//       totalPriceProducts,
//       totalPriceCombo,
//       storeId
//     });

//     // Asociar los productos al combo
//     await Promise.all(productData.map(async (product) => {
//       if (!product.amount || !product.unitType) {
//         throw new Error('Missing amount or unitType for one or more products');
//       }
//       await newCombo.addProduct(product.id, {
//         through: {
//           amount: product.amount,
//           unitType: product.unitType
//         }
//       });
//     }));

//     res.status(201).json({ message: 'Combo created successfully', combo: newCombo });
//   } catch (error) {
//     console.error('Error creating combo:', error);
//     res.status(500).json({ error: 'Internal Server Error', details: error.message });
//   }
// }
async function postCombos(req, res) {
  console.log(req.body);
  try {
    const { name, description, startDate, endDate, discount, productIds } = req.body;

    // Verificar si req.user tiene storeId
    if (!req.user || !req.user.storeId) {
      return res.status(401).json({ error: 'Unauthorized: storeId is missing' });
    }
    const storeId = req.user.storeId;

    // Validar los datos de entrada
    if (!name || !productIds) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Parsear productIds
    let productData;
    try {
      productData = JSON.parse(productIds);
      if (!Array.isArray(productData)) {
        return res.status(400).json({ error: 'Invalid productIds format' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON format for productIds' });
    }

    // Verificar si el combo ya existe en esa tienda
    let combo = await Combos.findOne({ where: { name, storeId } });

    if (combo) {
      return res.status(400).json({ error: 'El combo ya existe en esta tienda' });
    }

    const productIdsArray = productData.map(product => product.id);
    const products = await Products.findAll({ where: { id: productIdsArray } });

    if (products.length !== productIdsArray.length) {
      return res.status(400).json({ error: 'One or more product IDs are invalid' });
    }

    // Calcular el precio total de los productos sin aplicar promociones o descuentos
    const totalPriceProducts = products.reduce((acc, product) => {
      return acc + product.price;  // Asume que 'price' es el precio original
    }, 0);

    // Aplicar el descuento ingresado por el usuario
    const totalPriceCombo = totalPriceProducts - (totalPriceProducts * (discount / 100));

    // Procesar la imagen
    let imgProductBase64 = null;
    if (req.file) {
      const webpImageBuffer = await sharp(req.file.buffer).webp().toBuffer();
      imgProductBase64 = webpImageBuffer.toString('base64');
    }

    // Crear el nuevo combo
    const newCombo = await Combos.create({
      name,
      description,
      imgProduct: imgProductBase64 ? Buffer.from(imgProductBase64, 'base64') : null,
      startDate,
      endDate,
      discount,
      totalPriceProducts,  // Total original de los productos sin promociones
      totalPriceCombo,     // Total del combo con el descuento aplicado
      storeId
    });

    // Asociar los productos al combo
    await Promise.all(productData.map(async (product) => {
      if (!product.amount || !product.unitType) {
        throw new Error('Missing amount or unitType for one or more products');
      }
      await newCombo.addProduct(product.id, {
        through: {
          amount: product.amount,
          unitType: product.unitType
        }
      });
    }));

    res.status(201).json({ message: 'Combo created successfully', combo: newCombo });
  } catch (error) {
    console.error('Error creating combo:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

const deleteExpiredCombos = async () => {
  try {
    // Obtener combos expirados
    const expiredCombos = await Combos.findAll({
      where: {
        endDate: {
          [Op.lt]: new Date(),
        },
      },
      include: {
        model: Products,
        through: {
          model: ComboProducts,
        },
      },
    });

    // Eliminar combos y sus relaciones
    await Promise.all(expiredCombos.map(async (combo) => {
      await combo.destroy();
    }));

    console.log('Combos expirados eliminados correctamente');
  } catch (error) {
    console.error('Error eliminando combos expirados:', error);
  }
};

// Programar el cron job para ejecutarse diariamente a medianoche
cron.schedule('0 0 * * *', deleteExpiredCombos);

module.exports = {
  deleteExpiredCombos,
  getCombos,
  postCombos
};
