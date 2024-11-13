import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FabButtonCart from '../../Components/FabButtonsProfile/FabButtonCart';
import { UserContext } from '../../UserContext/UserContext';
import styles from './productsCategorySelectedStyle';

export default function ProductsCategorySelected({ route}) {
  const { category, storeId, phone } = route.params;
  console.log("params whatsapp:",phone)
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { customer } = useContext(UserContext);
  const [quantities, setQuantities] = useState({}); // State to hold quantity for each product
  const [btnVisibleAddProduct, setBtnVisibleAddProduct]= useState({})
  const [faBtnVisible, setFaBtnVisible]= useState(false);
  const [facturaData, setFacturaData] = useState({ products: [] }); // Estado para almacenar los productos seleccionados
  const [addedToCart, setAddedToCart] = useState({}); // Estado para almacenar productos en el carrito

  useEffect(() => {
    async function fetchProducts() {
      try {
        const customerId = customer.id;
        const token = await AsyncStorage.getItem('authToken');
        if (!customerId) {
          console.error('ID de cliente no disponible en el contexto');
          return;
        }
        const response = await axios.get(`http://192.168.0.9:3000/customer/getProductsStoreAssociatedCustomer/${customerId}/${storeId}/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    const loadFacturaData = async () => {
      const savedFacturaData = await AsyncStorage.getItem('facturaData');
      if (savedFacturaData) {
        setFacturaData(JSON.parse(savedFacturaData));
        setFaBtnVisible(true);
      }
    };

    fetchProducts();
    loadFacturaData();
  }, [category, storeId]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      setFilteredProducts(products.filter(product =>
        product.nameProduct.toLowerCase().includes(text.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  };
  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value) || 0;
    
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  
    setBtnVisibleAddProduct(prevVisibility => ({
      ...prevVisibility,
      [productId]: quantity > 0,
    }));
  };

// Guardar facturaData en localStorage cada vez que se actualice
useEffect(() => {
  const saveFacturaData = async () => {
    await AsyncStorage.setItem('facturaData', JSON.stringify(facturaData));
  };
  saveFacturaData();
}, [facturaData]);



const handleDeleteProduct = (index) => {
  const updatedProducts = facturaData.products.filter((_, i) => i !== index);
  const updatedData = { products: updatedProducts };
  setFacturaData(updatedData);
  AsyncStorage.setItem('facturaData', JSON.stringify(updatedData));
};

const handleAddProduct = (product) => {
  const quantity = quantities[product.id] || 1;

  // Agregar producto a facturaData
  setFacturaData(prevData => {
    const updatedData = {
      products: [
        ...prevData.products,
        {
          Producto: product.nameProduct,
          Amount: quantity,
          Prc_Und: product.price,
          TotalPrice: product.price * quantity,
        }
      ]
    };

    // También almacenar en 'selectedProducts'
    AsyncStorage.setItem('selectedProducts', JSON.stringify(updatedData.products));

    return updatedData;
  });
  setAddedToCart((prevAdded) => ({
    ...prevAdded,
    [product.id]: true, // Producto agregado al carrito
  }));
  setFaBtnVisible(true);
  setBtnVisibleAddProduct(prevVisibility => ({
    ...prevVisibility,
    [product.id]: false,
  }));
};

const handleSendProductsWhatsapp = async () => {
  try {
    // Obtener los productos desde facturaData directamente
    const products = facturaData.products;
    console.log("Productos a pedir", products);

    if (products.length === 0) {
      console.log("No hay productos seleccionados.");
      return; // O mostrar un mensaje al usuario
    }

    // Construir el mensaje con los productos seleccionados
    let message = "Hola, me gustaría comprar los siguientes productos:\n\n";

    products.forEach((product, index) => {
      message += `${index + 1}. ${product.Producto} - Cantidad: ${product.Amount}\n`;
    });

    // Codificar el mensaje en formato URL
    const encodedMessage = encodeURIComponent(message);

    // Crear la URL de WhatsApp con el número de teléfono de la tienda y el mensaje
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Abrir el enlace de WhatsApp
    await Linking.openURL(whatsappUrl);

    // Esperar un segundo antes de eliminar datos (puede ser opcional)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Eliminar los productos del localStorage
    await AsyncStorage.removeItem('selectedProducts');
    await AsyncStorage.removeItem('facturaData'); // Si deseas eliminar la factura también

    // Restablecer el estado de facturaData a su valor inicial
    setFacturaData({ products: [] }); // Reinicia el estado de facturaData

    console.log("Datos de factura y productos seleccionados eliminados.");

    // Mostrar alerta de éxito
    Alert.alert(
      "¡Datos Enviados!",
      "Los productos han sido enviados correctamente.",
      [
        {
          text: "OK",
          onPress: () => console.log("Alerta cerrada"), // Puedes realizar otras acciones si es necesario
        },
      ],
      { cancelable: false } // Para que no se pueda cerrar tocando fuera de la alerta
    );
    setFaBtnVisible(false); // Ocultar el botón flotante

  } catch (error) {
    console.error("Error al enviar productos por WhatsApp:", error);
  }
};

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.rowTitleP}>
        <Text style={styles.titleRecordP}>Productos</Text>
      </View>
      <View style={styles.rowTextInput}>
        <TextInput
          placeholder="Nombre del producto"
          style={styles.inputRecordP}
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.rowContentProducts}>
        <View style={styles.contentSCProduct}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {filteredProducts.map(product => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productContent}>
                  <Image style={styles.productImage} source={{ uri: product.imgProduct }} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{product.nameProduct}</Text>
                    {product.price && product.price < product.salePrice ? (
                      <View style={styles.promotionContainer}>
                        <Text style={styles.originalPrice}>Antes: ${Math.round(product.salePrice)}</Text>
                        <Text style={styles.promotionPrice}>Ahora: ${Math.round(product.price)}</Text>
                      </View>
                    ) : (
                      <Text style={styles.productPrice}>Precio de venta: ${Math.round(product.salePrice)}</Text>
                    )}
                    <Text style={styles.productPrice}>Se vender por: {product.unitType}</Text>

                  </View>
                  {addedToCart[product.id] && (
                    <View  style={styles.productAdded}>
                      <IconButton
                        icon="check"
                        iconColor="white" // Cambia el color si es necesario
                        size={24}     // Tamaño del icono
                      />                    
                    </View>
                  )}
                </View>
                               
                <View style={styles.addToCartContainer}>
                  <TextInput
                    style={styles.quantityInput}
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    value={quantities[product.id]?.toString() || ''}
                    onChangeText={(value) => handleQuantityChange(product.id, value)}
                  />
                  {btnVisibleAddProduct[product.id] && (
                    <TouchableOpacity style={styles.buttonAddProduct} onPress={() => handleAddProduct(product)}>
                      <Text style={styles.textButtonAddProduct}>Agregar al carrito</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {faBtnVisible && facturaData.products && facturaData.products.length > 0 && (
        <FabButtonCart
          storeId={storeId}
          idNumber={customer.id}
          facturaData={facturaData} // Pasa facturaData a FabButtonCart
          handleDeleteProduct={handleDeleteProduct}
          handleSendProductsWhatsapp={handleSendProductsWhatsapp}
        />
      )}
    </View>
  );
}
