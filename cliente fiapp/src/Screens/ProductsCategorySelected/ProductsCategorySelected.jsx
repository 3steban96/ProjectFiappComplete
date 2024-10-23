
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { UserContext } from '../../UserContext/UserContext';
import styles from './productsCategorySelectedStyle';

export default function ProductsCategorySelected({ route }) {
  const {category,storeId}= route.params;
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { customer } = useContext(UserContext);

  useEffect(()=>{
    async function fetchProducts() {
      try {
        const customerId = customer.id;
        const token = await AsyncStorage.getItem('authToken');
        console.log("token",token)
        if (!customerId) {
          console.error('ID de cliente no disponible en el contexto');
          return;
        }
        const response = await axios.get(`http://192.168.0.6:3000/customer/getProductsStoreAssociatedCustomer/${customerId}/${storeId}/${category}`,{
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
    fetchProducts();
  }, [category, storeId])

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
  return (
    <View style={styles.container}>
      <StatusBar />
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
      <View style={styles.rowContentProducts}>
        <View style={styles.contentSCProduct}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {filteredProducts.map(product => (
              <View key={product.id} style={styles.productCard}>
                {/* Contenido del producto */}
                <View style={styles.productContent}>
                  <Image style={styles.productImage} source={{ uri: product.imgProduct }} />                  
                  <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{product.nameProduct}</Text>
                    <Text style={styles.productPrice}>Precio de venta: ${Math.round(product.salePrice)}</Text>
                    <Text style={styles.productStock}>Disponible: {product.amount} ({product.unitType})</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
