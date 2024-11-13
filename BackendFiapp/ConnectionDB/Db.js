require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const { Sequelize, DataTypes } = require('sequelize'); // Asegúrate de importar DataTypes
const fs = require('fs');
const path = require('path');

// Cargar las variables de entorno
const {
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST,
} = process.env;

// Configurar la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fiapp`, {
  logging: false, // Deshabilitar el logging de las consultas SQL
  native: false, // Deshabilitar pg-native para mayor compatibilidad
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leer todos los archivos en la carpeta models y agregarlos a modelDefiners
fs.readdirSync(path.join(__dirname, '../Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../Models', file)));
  });

// Injectar la conexión (sequelize) y DataTypes a todos los modelos
modelDefiners.forEach(model => model(sequelize, DataTypes));

// Capitalizar los nombres de los modelos (ej: product => Product)
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Extraer los modelos importados como propiedades
const { Store, Customers, CustomerStore, Payment,Products, Supplier, Purchases, Promotions, ProductPromotions, Combos, ComboProducts } = sequelize.models;

CustomerStore.hasMany(Payment, {
  foreignKey: 'customerStoreId',
  as: 'payments',
  onDelete: 'CASCADE'
});

Payment.belongsTo(CustomerStore, {
  foreignKey: 'customerStoreId',
  as: 'customerStore',
  onDelete: 'CASCADE'
});
// Relación muchos a muchos entre Customers y Store
Customers.belongsToMany(Store, {
  through: 'CustomerStore',
  foreignKey: 'customerId',
  otherKey: 'storeId',
  as: 'stores', // Usamos 'stores' como alias para las tiendas de un cliente
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Store.belongsToMany(Customers, {
  through: 'CustomerStore',
  foreignKey: 'storeId',
  otherKey: 'customerId',
  as: 'customers', // Usamos 'customers' como alias para los clientes de una tienda
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Relación muchos a muchos entre Customers y Store con la tabla intermedia CustomerRatings (para calificaciones)
Customers.belongsToMany(Store, {
  through: 'CustomerRatings',
  foreignKey: 'customerId',
  otherKey: 'storeId',
  as: 'ratedStores', // Alias para tiendas calificadas por un cliente
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Store.belongsToMany(Customers, {
  through: 'CustomerRatings',
  foreignKey: 'storeId',
  otherKey: 'customerId',
  as: 'ratedCustomers', // Alias para clientes que calificaron una tienda
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});  
// Relación uno a muchos entre Customers y Purchases
Store.hasMany(Products, { foreignKey: 'storeId', as: 'prodcuts' });
Products.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Relación uno a muchos entre Store y Combos
Store.hasMany(Combos, { foreignKey: 'storeId', as: 'combos' });
Combos.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Relación uno a muchos entre Store y Promotions
Store.hasMany(Promotions, { foreignKey: 'storeId', as: 'Promotions' });
Promotions.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Relación uno a muchos entre Store y Purchases
Store.hasMany(Purchases, { foreignKey: 'storeId', as: 'purchases' });
Purchases.belongsTo(Store, { foreignKey: 'storeId', as: 'stores' });
// Relación uno a muchos entre Customers y Purchases
Customers.hasMany(Purchases, { foreignKey: 'customerId', as: 'purchases' });
Purchases.belongsTo(Customers, { foreignKey: 'customerId', as: 'customer' });
// Relación muchos a muchos entre Products y Purchases
Purchases.belongsToMany(Products, { through: 'PurchaseProducts', foreignKey: 'purchaseId', as: 'products' });
Products.belongsToMany(Purchases, { through: 'PurchaseProducts', foreignKey: 'productId', as: 'purchases' });

// Relación muchos a muchos entre Products y Supplier
Products.belongsToMany(Supplier, { through: 'ProductSupplier' });
Supplier.belongsToMany(Products, { through: 'ProductSupplier' });

// Relación uno a muchos: Store tiene muchos Suppliers
Store.hasMany(Supplier, { foreignKey: 'storeId', as: 'suppliers' });
Supplier.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Relación muchos a muchos entre Products y Promotions
Products.belongsToMany(Promotions, { through: ProductPromotions, foreignKey: 'ProductId' });
Promotions.belongsToMany(Products, { through: ProductPromotions, foreignKey: 'PromotionId' });

// Definir el comportamiento en cascada para Combos y Products
Products.belongsToMany(Combos, { through: ComboProducts, foreignKey: 'productId', onDelete: 'CASCADE' });
Combos.belongsToMany(Products, { through: ComboProducts, foreignKey: 'comboId', onDelete: 'CASCADE' });


// Exportar los modelos y la conexión
module.exports = {
  ...sequelize.models, // Para importar los modelos: const { Store, Customers, Products } = require('./db.js');
  conn: sequelize,     // Para importar la conexión: const { conn } = require('./db.js');
};
