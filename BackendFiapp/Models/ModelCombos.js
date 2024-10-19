module.exports = (sequelize, DataTypes) => {
    const Combos = sequelize.define('Combos', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      imgProduct: {
        type: DataTypes.BLOB, 
        allowNull: true, 
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPriceProducts: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPriceCombo: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

    }
);

    return Combos;
  };