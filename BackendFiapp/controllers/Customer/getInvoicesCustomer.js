const { Purchases,Store }= require ('../../ConnectionDB/Db.js')

async function getInvoicesCustomer(req, res) {
    try {
      const { customerId } = req.params;
      
      if ( !customerId) {
        return res.status(400).json({ error: 'ID de cliente no disponible' });
      }
  
      // Obtener las facturas del cliente específico en una tienda determinada
      const invoices = await Purchases.findAll({
        where: {
          customerId,
        },
        include: {
          model: Store,
          as: 'stores',  // Asegúrate de usar el alias correcto si está definido en la asociación
          attributes: ['nameStore']  // Solo los atributos necesarios de la tienda
        }
      });
  
      if (invoices.length === 0) {
        return res.status(404).json({ message: 'No se encontraron facturas para este cliente en la tienda especificada' });
      }
      console.log("Datos back",invoices)
      return res.status(200).json(invoices);
    } catch (error) {
      console.error('Error al obtener facturas:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
module.exports={
    getInvoicesCustomer
}