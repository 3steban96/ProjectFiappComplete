module.exports = (sequelize, DataTypes) => {
  // Añadir columna storeCreditLimit en la tabla intermedia
  const CustomerStore = sequelize.define('CustomerStore', {
    storeCreditLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,  // Por defecto, al asociar el cliente y la tienda, el cupo será 0 hasta que se defina
    },
  });
  return CustomerStore;
};
