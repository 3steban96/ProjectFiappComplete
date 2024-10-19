module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define('Purchases', {
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    trusted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purchaseDocument: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
  });


  return Purchases;
};
