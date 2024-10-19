module.exports = (sequelize, DataTypes) => {
    const Promotions = sequelize.define('Promotions', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    return Promotions;
  };
  