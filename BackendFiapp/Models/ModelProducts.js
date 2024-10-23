module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
      nameProduct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category:{
        type: DataTypes.ENUM(
            'Frutas y verduras', 
            'Carnes y pescados', 
            'Lacteos y huevos',
            'Panadería y repostería',
            'Granos, pasta y legumbres',
            'Cereales',
            'Bebidas',
            'Snacks y dulces',
            'Condimentos',
            'Bebidas alcohólicas',            
            ), 
        allowNull: false,
      },
      purchasePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imgProduct: {
        type: DataTypes.BLOB, 
        allowNull: true, 
      },
      salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unitType:{
        type: DataTypes.ENUM(
          'Unds', 
          'Lbs',          
          ), 
        allowNull: false,
      }
    });
  
    return Products;
  };
  