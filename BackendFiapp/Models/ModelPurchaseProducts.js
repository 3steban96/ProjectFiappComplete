module.exports = (sequelize, DataTypes) => {
    const PurchaseProducts = sequelize.define('PurchaseProducts', {
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    });

    return PurchaseProducts;
};
