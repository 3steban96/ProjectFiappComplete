import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../UserContext/UserContext';
import ModalsProducts from '../Components/ModalsProducts/ModalsProducts';
import styles from './createComboStyle';

export default function CreateCombo() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [searchTextProduct, setSearchTextProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [totalPriceProducts, setTotalPriceProducts] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectPrice, setPriceProduct] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const { store } = useContext(UserContext);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || dateStart;
    setShowStart(Platform.OS === 'ios');
    setDateStart(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setShowEnd(Platform.OS === 'ios');
    setDateEnd(currentDate);
  };

  const showDatePickerStart = () => {
    setShowStart(true);
  };

  const showDatePickerEnd = () => {
    setShowEnd(true);
  };

  const handleAccept = (resultPrice, numericAmount, selectedUnit) => {
    setSelectedProducts([...selectedProducts, { id: selectedProductId, nameProduct: selectedProductName, salePrice: selectPrice, amount: numericAmount, totalPrice: resultPrice, selectedUnit }]);
    setIsModalVisible(false);
    calculateTotalPrice([...selectedProducts, { id: selectedProductId, nameProduct: selectedProductName, salePrice: selectPrice, amount: numericAmount, totalPrice: resultPrice, selectedUnit }]);

  };

  const calculateTotalPrice = (products) => {
    const totalPrice = products.reduce((total, product) => total + parseFloat(product.totalPrice), 0);
    setTotalPriceProducts(totalPrice);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchProducts = async () => {
        if (!store || !store.id) {
          alert('No se encontró el ID de la tienda. Por favor, inicie sesión nuevamente.');
          return;
        }    
        try {
          const token = await AsyncStorage.getItem('authToken');
          const response = await axios.get('http://192.168.0.9:3000/store/getProducts',{
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
          const sortedProducts = response.data.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
          setProducts(sortedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }, [])
  );

  const handleSearchProductChange = (text) => {
    setSearchTextProduct(text);
    const filtered = products.filter((product) =>
      product.nameProduct.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductSelection = (product) => {
    setSelectedProductName(product.nameProduct);
    setSelectedProductId(product.id);
    setPriceProduct(product.salePrice);
    setIsModalVisible(true);
    setSearchTextProduct('');
  };

  const removeProduct = (productToRemove) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product !== productToRemove)
    );
  };

  const handleTextChange = (text) => {
    const formattedText = text.replace(/\D/g, '').slice(0, 2);
    setDiscount(formattedText);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert('You did not select any image.');
    }
  };
    const calculeteDiscount= discount * totalPriceProducts/100;
    const totalPriceCombo = totalPriceProducts - calculeteDiscount;

   const handleSubmit = async () => {
    // Validación de datos
    if (!title || !description || !dateStart || !dateEnd || !totalPriceProducts || !discount|| selectedProducts.length === 0 || !image) {
      // console.log(title, description, dateStart, dateEnd, totalPriceProducts, discount, selectedProducts, image);
      Alert.alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Crear un objeto con los datos a enviar
      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      formData.append('startDate', dateStart.toISOString());
      formData.append('endDate', dateEnd.toISOString());
      formData.append('discount', discount);
      formData.append('totalPriceProducts', totalPriceProducts);
      formData.append('totalPriceCombo', totalPriceCombo);
      // formData.append('productIds', JSON.stringify(selectedProducts));
      formData.append('imgProduct', {
        uri: image,
        name: `combo.${image.split('.').pop()}`,
        type: 'image/jpeg'
      });
      formData.append('productIds', JSON.stringify(selectedProducts.map(product => ({
        id: product.id,
        amount: product.amount,
        unitType: product.selectedUnit
      }))));
      // Enviar los datos al servidor
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post('http://192.168.0.9:3000/store/createCombo', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verificar si la respuesta es exitosa
      if (response.status === 201) {
        Alert.alert('Success', 'Combo created successfully');
      } else {
        Alert.alert('Error', 'Error al crear el combo');
      }
    } catch (error) {
      // Manejar cualquier error que se produzca
      console.error('Error creating Combo:', error);
      Alert.alert('Error', 'Error al crear el combo');
    }
  };
  

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se necesita permiso para acceder a la galería');
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={{ paddingHorizontal: 20, width: '100%', flex: 2 }}>
        <View style={styles.rowTitleP}>
          <Text style={styles.titleRecordP}>Crear combo</Text>
        </View>
        <ScrollView style={{ width: '100%', paddingVertical: 10, paddingBottom: 80 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder='Título'
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.dateRowContainer}>
            <View style={styles.dateStart}>
              <Text style={styles.dateText}>Desde</Text>
              <TouchableOpacity onPress={showDatePickerStart} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{dateStart.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateEnd}>
              <Text style={styles.dateText}>Hasta</Text>
              <TouchableOpacity onPress={showDatePickerEnd} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{dateEnd.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showStart && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateStart}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeStart}
            />
          )}
          {showEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateEnd}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
            />
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Descripción</Text>
            <TextInput
              style={styles.input}
              placeholder='Descripción'
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.rowTextInput}>
            <Text style={styles.inputText}>Producto(s)</Text>
            <TextInput
              placeholder="Nombre del producto"
              style={styles.inputsRecordP}
              value={searchTextProduct}
              onChangeText={handleSearchProductChange}
            />
            <View>
              {searchTextProduct !== '' && (
                <ScrollView style={styles.scrollViewProducts}>
                  {filteredProducts.map((item, index) => (
                    <TouchableHighlight
                      key={index}
                      style={styles.buttonScrollviewProduct}
                      underlayColor="#d9d9d9"
                      onPress={() => handleProductSelection(item)}
                    >
                      <View style={styles.contentRowButtonSCProd}>
                        <View style={styles.contentColumnButtonSCProd}><Text>{item.nameProduct}</Text></View>
                        <View style={styles.contentColumnButtonSCProd}><Text>$ {item.salePrice}</Text></View>
                      </View>
                    </TouchableHighlight>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Productos seleccionados:</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
            {selectedProducts.map((product, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0e0e0', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, margin: 5 }}>
                <Text style={{ marginRight: 10 }}>{product.nameProduct}: ${product.salePrice} x {product.amount} {product.selectedUnit} = ${product.totalPrice}</Text>
                <TouchableOpacity onPress={() => removeProduct(product)} style={{ backgroundColor: 'red', borderRadius: 5, padding: 5 }}>
                  <Text style={{ color: 'white' }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{ backgroundColor: 'black', borderRadius: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', margin: 5 }}>Total: $ {selectedProducts.reduce((total, product) => total + parseFloat(product.totalPrice), 0)}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Descuento</Text>
            <TextInput
              style={styles.input}
              placeholder='-%'
              value={discount}
              onChangeText={handleTextChange}              
              keyboardType='numeric'
            />
          </View>
          <TouchableOpacity onPress={pickImage} style={{flexDirection:'row', backgroundColor:'black', justifyContent:'space-evenly', borderRadius:5, padding:10}}>
            <View style={{flexDirection:'row'}}>
              <View style={{paddingHorizontal:10}}>          
                <Entypo name="upload" size={24} color="white" />
              </View>
              <View>
                <Text style={{fontWeight:'bold', color:'white'}}>Agregar imagen</Text>
              </View>        
            </View>    
          </TouchableOpacity>
          <View style={styles.rowTitleP}>
            <Text style={styles.titleRecordP}>Previsualización</Text>
          </View>
          <View style={{ backgroundColor: 'white', marginHorizontal: 10, marginTop: 10, borderRadius: 10, marginBottom: 30 }}>
            <View style={{ flexDirection: 'row', height: 160, borderRadius: 10, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'column', width: '100%' }}>
                {image && <Image source={{ uri: image }} style={{ width: '100%', height: 160 }} />}
              </View>
            </View>
            <View style={{ flexDirection: 'column',paddingHorizontal: 10, overflow:'hidden' }}>
              <Text style={{ fontWeight: 'bold' }}>Título: {title}</Text>
              <Text>Descripción: {description}</Text>
              <View style={{ flexDirection: 'row',flexWrap: 'wrap',}}>
                <Text>Artículos:</Text>
                {selectedProducts.map((product, index) => (
                  <Text key={index} > {product.nameProduct} ({product.amount} {product.selectedUnit}) </Text>
                ))}
              </View>
              <Text>Descuento: -%{discount}</Text>
              <Text>Valido: {dateStart.toLocaleDateString()} a {dateEnd.toLocaleDateString()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
              <View style={{ backgroundColor: 'black', borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', margin: 5 }}>Total: $ {totalPriceCombo}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Crear Combo</Text>
          </TouchableOpacity>
        </ScrollView>
        <ModalsProducts
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          productName={selectedProductName}
          priceProduct={selectPrice}
          onAccept={handleAccept}
        />
      </View>
    </View>
  );
}
