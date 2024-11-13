module.exports = (sequelize, DataTypes) => {
    const ProductPromotions = sequelize.define('ProductPromotions', {
      pricePromotion: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return ProductPromotions;
  };