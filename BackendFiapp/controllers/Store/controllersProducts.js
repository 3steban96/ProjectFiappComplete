const  axios  = require("axios");
const { Op,where,Sequelize}= require('sequelize');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const {Products, Supplier, Customers, Purchases, Store }= require ('../../ConnectionDB/Db.js')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// async function postProducts(req, res) {
//   try {
//     console.log(req.body)
//     const { nameP, categoryP, purchasePriceP, amountP, unitTypeP, salesPriceP, companyS, numberS, addressS } = req.body;

//     // Verificar si todos los campos requeridos están presentes
//     if (!nameP || !categoryP || !purchasePriceP || !salesPriceP || !companyS || !numberS || !addressS || !amountP || !unitTypeP) {
//       return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
//     }

//     // Obtener el ID de la tienda que ha iniciado sesión
//     const storeId = req.user.storeId; // Este valor debe ser obtenido desde la autenticación

//     // Verificar si el producto ya existe en esa tienda
//     let product = await Products.findOne({
//       where: { nameProduct: nameP, storeId: storeId } // Buscar por nombre y tienda
//     });

//     if (product) {
//       return res.status(400).json({ error: 'El producto ya existe en esta tienda' });
//     }

//     // Verificar si el proveedor ya existe
//     let supplier = await Supplier.findOne({
//       where: { company: companyS, phone: numberS, address: addressS }
//     });

//     // Crear el proveedor si no existe
//     if (!supplier) {
//       supplier = await Supplier.create({ company: companyS, phone: numberS, address: addressS });
//     }

//     // Manejo de la imagen del producto
//     let imgProductBase64 = null;
//     if (req.file) {
//       const webpImageBuffer = await sharp(req.file.buffer).webp().toBuffer();
//       imgProductBase64 = webpImageBuffer.toString('base64');
//     }

//     // Crear el nuevo producto y asociarlo a la tienda
//     const newProduct = await Products.create({
//       nameProduct: nameP,
//       category: categoryP,
//       purchasePrice: purchasePriceP,
//       amount: amountP,
//       unitType: unitTypeP,
//       salePrice: salesPriceP,
//       imgProduct: imgProductBase64 ? Buffer.from(imgProductBase64, 'base64') : null,
//       storeId: storeId // Asociar el producto con la tienda
//     });

//     // Asociar el producto con el proveedor
//     await newProduct.addSupplier(supplier);

//     return res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }
async function postProducts(req, res) {
  try {
    console.log(req.body);
    const { nameP, categoryP, purchasePriceP, amountP, unitTypeP, salesPriceP, companyS, numberS, addressS } = req.body;

    // Verificar si todos los campos requeridos están presentes
    if (!nameP || !categoryP || !purchasePriceP || !salesPriceP || !companyS || !numberS || !addressS || !amountP || !unitTypeP) {
      return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
    }

    // Obtener el ID de la tienda que ha iniciado sesión
    const storeId = req.user.storeId; // Asegúrate de que este valor provenga de la autenticación

    // Verificar si el producto ya existe en esa tienda
    let product = await Products.findOne({
      where: { nameProduct: nameP, storeId: storeId } // Buscar por nombre y tienda
    });

    if (product) {
      return res.status(400).json({ error: 'El producto ya existe en esta tienda' });
    }

    // Verificar si el proveedor ya existe y está relacionado con la tienda
    let supplier = await Supplier.findOne({
      where: { company: companyS, phone: numberS, address: addressS },
      include: {
        model: Store,
        as: 'store', // Usar el alias especificado en la relación
        where: { id: storeId }, // Solo buscar proveedores asociados a esta tienda
        required: false // Permitir que el proveedor no esté asociado aún con esta tienda
      }
    });

    // Crear el proveedor y asociarlo con la tienda si no existe
    if (!supplier) {
      supplier = await Supplier.create({ company: companyS, phone: numberS, address: addressS });
      await supplier.setStore(storeId); // Asociar el proveedor con la tienda
    } else if (!supplier.store) {
      // Si el proveedor existe pero no está asociado a la tienda, asociarlo
      await supplier.setStore(storeId);
    }

    // Manejo de la imagen del producto
    let imgProductBase64 = null;
    if (req.file) {
      const webpImageBuffer = await sharp(req.file.buffer).webp().toBuffer();
      imgProductBase64 = webpImageBuffer.toString('base64');
    }

    // Crear el nuevo producto y asociarlo a la tienda
    const newProduct = await Products.create({
      nameProduct: nameP,
      category: categoryP,
      purchasePrice: purchasePriceP,
      amount: amountP,
      unitType: unitTypeP,
      salePrice: salesPriceP,
      imgProduct: imgProductBase64 ? Buffer.from(imgProductBase64, 'base64') : null,
      storeId: storeId // Asociar el producto con la tienda
    });

    // Asociar el producto con el proveedor
    await newProduct.addSupplier(supplier);

    return res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function getProducts(req, res) {
  try {
    // console.log(req)
    // Obtener el ID de la tienda que ha iniciado sesión desde el token
    const storeId = req.user.storeId; // `storeId` debe estar en `req.user`
    console.log("Id recibido de la tienda",storeId)
    if (!storeId) {
      return res.status(400).json({ error: 'ID de tienda no disponible' });
    }

    // Obtener los productos asociados a la tienda que ha iniciado sesión
    const dbProducts = await Products.findAll({
      where: { storeId: storeId }, // Filtrar por el ID de la tienda
      order: [['nameProduct', 'ASC']], // Ordenar por nombre de producto de manera ascendente
      include: [{ 
        model: Supplier, 
        attributes: ['company', 'phone'],
      }] 
    });

    const productsWithImages = dbProducts.map(product => {
      return {
        ...product.dataValues,
        imgProduct: product.imgProduct ? `data:image/png;base64,${product.imgProduct.toString('base64')}` : null,
        suppliers: product.Suppliers.map(supplier => ({
          supplierName: supplier.company,
          phone: supplier.phone
        }))
      };
    });

    return res.status(200).json(productsWithImages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
async function getSuppliers(req, res) {
  try {
    const storeId = req.user.storeId; // ID de la tienda autenticada
    if (!storeId) {
      return res.status(400).json({ error: 'Se requiere un storeId' });
    }

    // Buscar los proveedores que están asociados a la tienda actual
    const suppliers = await Supplier.findAll({
      where: { storeId: storeId } // Filtrar por el storeId de la tienda autenticada
    });

    if (suppliers.length === 0) {
      return res.status(404).json({ error: 'No se encontraron proveedores para esta tienda' });
    }

    return res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error al obtener los proveedores:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


async function deleteProduct(req, res) {
  try {
      const { productDelete, storeId } = req.query;

      if (!productDelete || !storeId) {
          return res.status(400).json({ error: 'El nombre del producto y el storeId son requeridos' });
      }

      // Verifica que el producto pertenezca a la tienda
      const product = await Products.findOne({
          where: {
              nameProduct: productDelete,
              storeId: storeId // Filtra por storeId para asegurarte que pertenece a la tienda
          }
      });

      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado o no pertenece a esta tienda' });
      }

      // Elimina el producto
      await product.destroy();

      return res.status(200).json({ message: 'El registro se ha eliminado correctamente' });
  } catch (error) {
      console.error('Error al eliminar el registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
async function updateProduct(req, res) {
  const { productN, purchasePriceP, salesPriceP, storeId } = req.body;

  if (!storeId || !productN) {
      return res.status(400).json({ error: 'El storeId y el nombre del producto son requeridos' });
  }

  const updateDataProduct = {
      purchasePrice: purchasePriceP,
      salePrice: salesPriceP
  };

  try {
      // Busca el producto por nombre y tienda
      const product = await Products.findOne({
          where: {
              nameProduct: productN,
              storeId: storeId // Asegúrate de que el producto pertenece a la tienda
          }
      });

      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado o no pertenece a esta tienda' });
      }

      // Actualiza el producto
      await product.update(updateDataProduct);

      return res.status(200).json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return res.status(500).json({ message: 'Error al actualizar el producto' });
  }
}

module.exports={
    postProducts, 
    getSuppliers,
    getProducts,
    deleteProduct,
    updateProduct,
}