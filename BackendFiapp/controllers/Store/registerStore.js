const { Store }= require ('../../ConnectionDB/Db.js')
async function registerStore(req, res) {
    try {
        console.log("Datos recibidos:",req.body)
        const { nameStore, nit, address, city, phone, email, password } = req.body;
  
        // Verificación de campos obligatorios
        if (!nameStore || !nit || !address || !city || !phone || !email || !password) {
            return res.status(400).json({ error: "Faltan campos obligatorios en la solicitud" });
        }
  
        let store = await Store.findOne({
            where: { nit: nit }
        });
  
        if (store) {
            return res.status(400).json({ error: "La tienda ya existe" });
        } else {       
            
            store = await Store.create({
                nameStore: nameStore,
                nit: nit,
                address: address,
                city: city,
                phone: phone,
                email: email,
                password: password,
            });
           return res.status(201).json({ message: "Tienda creada exitosamente", store });
        }
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
module.exports = {registerStore};