const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    nameStore: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nit:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE, // Fecha de expiración del token
      allowNull: true,
    },
    recoveryCode: {
      type: DataTypes.STRING, // Agregamos el campo recoveryCode
      allowNull: true,
    },
  });
  Store.beforeCreate(async (store, options) => {
    if (store.password) {
      const salt = await bcrypt.genSalt(10);
      store.password = await bcrypt.hash(store.password, salt);
    }
  });

  Store.beforeUpdate(async (store, options) => {
    if (store.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      store.password = await bcrypt.hash(store.password, salt);
    }
  });

  Store.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  return Store;
};
