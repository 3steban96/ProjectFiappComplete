const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeDocument: {
      type: DataTypes.ENUM('CC', 'PS', 'CE'),
      allowNull: false,
    },
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qrCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    globalCreditLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 800000,
      allowNull: false,
    },
  });
  Customers.beforeCreate(async (customer, options) => {
    if (customer.password) {
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(customer.password, salt);
    }
  });

  Customers.beforeUpdate(async (customer, options) => {
    if (customer.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(customer.password, salt);
    }
  });

  Customers.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  return Customers;
};