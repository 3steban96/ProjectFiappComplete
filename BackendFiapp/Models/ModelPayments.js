module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      paymentMethod: {
        type: DataTypes.ENUM('Transferencia', 'Efectivo'),
        allowNull: false,
      },
      datePayment: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentFile: {
        type: DataTypes.BLOB('long'),  
        allowNull: true,  // Sólo si se adjunta un comprobante
      },
    });  
    return Payment;
  };
  