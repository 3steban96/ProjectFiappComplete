module.exports = (sequelize, DataTypes) => {
  // Añadir columna storeCreditLimit en la tabla intermedia
  const CustomerStore = sequelize.define('CustomerStore', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Genera un ID único automáticamente para cada fila
    },
    storeCreditLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,  // Por defecto, al asociar el cliente y la tienda, el cupo será 0 hasta que se defina
    },
    storeCreditBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Saldo inicial en 0
    },
  });
  return CustomerStore;
};
