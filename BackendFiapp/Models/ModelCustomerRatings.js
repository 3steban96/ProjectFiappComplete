module.exports = (sequelize, DataTypes) => {
    const CustomerRatings = sequelize.define('CustomerRatings', {
      rating: {
        type: DataTypes.INTEGER, // Puede ser cualquier valor, como por ejemplo de 1 a 5
        allowNull: false,
        validate: {
          min: 1,
          max: 5, // Rango de calificación de 1 a 5, ajusta si necesitas
        },
      },
    }, {
      timestamps: true, // Si quieres registrar cuándo fue dada la calificación
    });
  
    return CustomerRatings;
  };
  