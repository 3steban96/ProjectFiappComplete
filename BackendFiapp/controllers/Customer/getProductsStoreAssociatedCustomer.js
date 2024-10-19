const {Products,  Customers, Purchases, Store }= require ('../../ConnectionDB/Db.js')

async function getProductsStoreAssociatedCustomer(req, res) {
    try {
      // console.log(req)
      const { customerId } = req.params;
      const { storeId } = req.params;

      console.log("Id recibido del cliente",customerId)
      console.log("Id recibido de la tienda",storeId)

      if (!customerId) {
        return res.status(400).json({ error: 'ID del cliente no disponible' });
      }
      if (!storeId) {
        return res.status(400).json({ error: 'ID de tienda no disponible' });
      }
  
      // Obtener los productos asociados a la tienda que ha iniciado sesión
      const dbProducts = await Products.findAll({
        where: { storeId: storeId }, // Filtrar por el ID de la tienda
        order: [['nameProduct', 'ASC']], // Ordenar por nombre de producto de manera ascendente
      });
  
      const productsWithImages = dbProducts.map(product => {
        return {
          ...product.dataValues,
          imgProduct: product.imgProduct ? `data:image/png;base64,${product.imgProduct.toString('base64')}` : null,
        };
      });
  
      return res.status(200).json(productsWithImages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
module.exports={
    getProductsStoreAssociatedCustomer
}