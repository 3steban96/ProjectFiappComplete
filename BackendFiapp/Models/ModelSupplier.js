module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Supplier;
  };
  