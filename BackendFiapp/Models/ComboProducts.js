module.exports = (sequelize, DataTypes) => {
    const ComboProducts = sequelize.define('ComboProducts', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unitType: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return ComboProducts;
  };
  