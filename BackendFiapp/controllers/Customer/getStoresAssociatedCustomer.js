const { Customers, Store } = require('../../ConnectionDB/Db.js');

async function getStoresAssociatedCustomer(req, res) {  // Asegúrate de pasar req y res
    try {
        const { customerId } = req.params;  // Extraemos customerId desde req.params

        // Buscar al cliente junto con las tiendas asociadas
        const customer = await Customers.findOne({
            where: { id: customerId },
            include: {
                model: Store,
                as: 'stores',  // Asegúrate de usar el alias correcto si está definido en la asociación
                attributes: ['id', 'nameStore', 'phone']  // Solo los atributos necesarios de la tienda
            }
        });

        // Si no se encuentra el cliente
        if (!customer) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Si el cliente no tiene tiendas asociadas
        if (!customer.stores || customer.stores.length === 0) {
            return res.status(404).json({ message: 'El cliente no tiene tiendas asociadas' });
        }

        // Devolver las tiendas asociadas
        res.status(200).json(customer.stores);

    } catch (error) {
        console.error('Error fetching stores associated:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
module.exports = getStoresAssociatedCustomer;  
