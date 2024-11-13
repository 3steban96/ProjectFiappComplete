import Entypo from '@expo/vector-icons/Entypo';
import { faBan, faExclamationTriangle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext.js';
import ModalDeleteProduct from '../Components/ModalDeleteProduct/ModalDeleteProduct.jsx';
import ModalEditProducts from '../Components/ModalEditProduct/ModalEditProduct.jsx';
import UserActionsBar from '../Components/UserActionsBar/UserActionsBar.jsx';
import styles from './productsStyle';

export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const { store } = useContext(UserContext);
  const [outOfStockSelected, setOutOfStockSelected] = useState(false);
  const [lowStockSelected, setLowStockSelected] = useState(false);
  const [filteredProductsChips, setFilteredProductsChips] = useState([]);

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const storeId = store.id;

      if (!storeId) {
        console.error('ID de tienda no disponible en el contexto');
        return;
      }

      const response = await axios.get('http://192.168.0.9:3000/store/getProducts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'storeId': storeId 
        }
      });

      const sortedProducts = response.data.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );


  const handleAlertDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalVisible(true);
  };

  const handleAlertEdit = (product) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const handleDeleteProduct = async () => {
    try {
      // Obtener el token almacenado
      const token = await AsyncStorage.getItem('authToken'); // Ajusta esto según el método que uses para almacenar el token
      // console.log('Token almacenado:', token);
      // Obtener el storeId desde el contexto
      const storeId = store.id;
      // console.log("Id de la store",storeId)
      if (!storeId) {
        console.error('ID de tienda no disponible en el contexto');
        return;
      }
      const response = await axios.delete(`http://192.168.0.9:3000/store/deleteProducts`, {
        params: { productDelete: selectedProduct.nameProduct }
      },{
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera
          'storeId': storeId
        }
      }
    );
      if (response.status === 200) {
        setProducts(products.filter(product => product.nameProduct !== selectedProduct.nameProduct));
        setDeleteModalVisible(false);
      } else {
        console.error('Failed to delete product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleEditProduct = async (updatedProduct) => {
    try {
      // Obtener el token almacenado
      const token = await AsyncStorage.getItem('authToken'); // Ajusta esto según el método que uses para almacenar el token
      // console.log('Token almacenado:', token);
      // Obtener el storeId desde el contexto
      const storeId = store.id;
      // console.log("Id de la store",storeId)
      if (!storeId) {
        console.error('ID de tienda no disponible en el contexto');
        return;
      }
      await axios.patch('http://192.168.0.9:3000/store/updateProduct', {
        productN: updatedProduct.nameProduct,
        purchasePriceP: updatedProduct.purchasePrice,
        salesPriceP: updatedProduct.salePrice,
        amountP: updatedProduct.amount,
        storeId: storeId // Añadir storeId en el cuerpo
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Incluye el token en la cabecera
        }
      });
      setProducts(products.map(product =>
        product.nameProduct === updatedProduct.nameProduct ? updatedProduct : product
      ));
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredProducts = products.filter(product =>
    product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    applyFilters();
  }, [products, outOfStockSelected, lowStockSelected, searchTerm]);

  const applyFilters = () => {
    let newFilteredProducts = products;

    if (searchTerm) {
      newFilteredProducts = newFilteredProducts.filter(product => 
        product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (outOfStockSelected) {
      newFilteredProducts = newFilteredProducts.filter(product => product.amount === 0);
    } else if (lowStockSelected) {
      newFilteredProducts = newFilteredProducts.filter(product => product.amount > 0 && product.amount <= 215);
    }

    setFilteredProductsChips(newFilteredProducts);
  };

  const handleOutOfStockPress = () => {
    setOutOfStockSelected(!outOfStockSelected);
    setLowStockSelected(false);
  };

  const handleLowStockPress = () => {
    setLowStockSelected(!lowStockSelected);
    setOutOfStockSelected(false);
  };

  const handleCallSupplier = (phone) => {
    if (!phone) {
      Alert.alert('Número de teléfono no disponible');
      return;
    }  
    const url = `tel:${phone}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url).catch(err => console.error('Error al intentar realizar la llamada:', err));
        } else {
          Alert.alert('No se puede realizar la llamada', 'El número de teléfono no es compatible con el dispositivo.');
        }
      })
      .catch((err) => {
        console.error('Error al intentar realizar la llamada:', err);
        Alert.alert('Error al intentar realizar la llamada', 'Hubo un problema al intentar realizar la llamada.');
      });
  };
  

  return (
    <View style={styles.container}>
      <StatusBar />
      <UserActionsBar style={styles.styleCompUserAB} />
      <View style={styles.rowTitleP}>
        <Text style={styles.titleRecordP}> Productos </Text>
      </View>
      <View style={styles.rowTextInput}>
        <View>
          <TextInput
            placeholder="Nombre del producto"
            style={styles.inputRecordP}
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-start', width: '100%', paddingHorizontal: 20, paddingTop: 10}}>
        <Chip onPress={handleLowStockPress} style={[styles.chipOutOfStock, outOfStockSelected && styles.selectedChip]}>
          <FontAwesomeIcon icon={faExclamationTriangle} style={styles.iconOutOfStock} />
        </Chip>
        
        <Chip onPress={handleOutOfStockPress} style={[styles.chipWarning, lowStockSelected && styles.selectedChip]}>
          <FontAwesomeIcon icon={faBan} style={styles.iconWarning} />
        </Chip>
      </View>


      <View style={styles.rowContentProducts}>
        <View style={styles.contentSCProduct}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {filteredProductsChips.map(product => (
              <View key={product.id}   
                style={[
                  styles.productCard,
                  product.amount === 0 ? styles.outOfStock : product.amount <= 20 ? styles.lowStock : null
                ]}
              >

                {/* Contenido del producto */}
                <View style={styles.productContent}>
                  <Image style={styles.productImage} source={{ uri: product.imgProduct }} />                  
                  <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{product.nameProduct}</Text>
                    <Text style={styles.productPrice}>Precio de compra: ${Math.round(product.purchasePrice)}</Text>
                    <Text style={styles.productPrice}>Precio de venta: ${Math.round(product.salePrice)}</Text>
                    <Text style={styles.productStock}>Disponible: {product.amount} ({product.unitType})</Text>
                  </View>

                  {/* Acciones (Editar/Eliminar) */}
                  <View style={styles.productActions}>
                    <TouchableHighlight onPress={() => handleAlertDelete(product)} underlayColor="rgba(255, 0, 0, 0.1)" style={styles.actionButton}>
                      <FontAwesomeIcon icon={faTrash} style={styles.iconDelete} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => handleAlertEdit(product)} underlayColor="rgba(223, 216, 0, 0.1)" style={styles.actionButton}>
                      <FontAwesomeIcon icon={faPencil} style={styles.iconEdit} />
                    </TouchableHighlight>
                  </View>
                </View>

                {/* Proveedores */}
                <View style={styles.supplierContainer}>
                  {product.suppliers.map((supplier, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCallSupplier(supplier.phone)} style={styles.supplierButton}>
                      <Entypo name="phone" size={24} color="white" />
                      <Text style={styles.supplierText}>Llamar a {supplier.supplierName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.rowBtnAddProduct}>
        <TouchableOpacity style={styles.btnAddProduct} onPress={() => navigation.navigate('AddProduct')}>
          <Text style={styles.txtBtnAddProduct}>Agregar producto</Text>
        </TouchableOpacity>
      </View>
      <ModalDeleteProduct
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        product={selectedProduct}
        onDelete={handleDeleteProduct}
      />
      <ModalEditProducts
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        product={selectedProduct}
        onEdit={handleEditProduct}
      />
    </View>
  );
}
