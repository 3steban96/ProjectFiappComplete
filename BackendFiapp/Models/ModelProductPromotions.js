module.exports = (sequelize, DataTypes) => {
    const ProductPromotions = sequelize.define('ProductPromotions', {
      priceBeforePromotion: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return ProductPromotions;
  };