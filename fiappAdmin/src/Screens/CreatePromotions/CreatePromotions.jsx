import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../UserContext/UserContext';
import styles from './createPromotionsStyle';

export default function CreatePromotions() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [searchTextProduct, setSearchTextProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [priceProduct, setPriceProduct] = useState('');
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

  useFocusEffect(
    React.useCallback(() => {
      const fetchProducts = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          const response = await axios.get('http://192.168.0.6:3000/store/getProducts',{
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

  const addSelectedProduct = (product) => {
    setSelectedProductName(product.nameProduct);
    setSelectedProduct(product); // Aquí actualizas el producto seleccionado
    setPriceProduct(product.salePrice);
    setSearchTextProduct('');
    setFilteredProducts([]);
  };
  console.log('Selected product image (base64):', selectedProduct?.imgProduct);

  const handleSubmit = async () => {
    if (!store || !store.id) {
      alert('No se encontró el ID de la tienda. Por favor, inicie sesión nuevamente.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');

      const promotionData = {
        title,
        description,
        discount,
        dateStart,
        dateEnd,
        selectedProductName,
      };
      console.log("Datos enviados:",promotionData);
      
      const response = await axios.post('http://192.168.0.6:3000/store/createPromotion', promotionData,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (response.status === 200) {
        Alert.alert('Éxito', 'Promoción creada exitosamente');
      }
    } catch (error) {
      console.error('Error creating promotion:', error);
      Alert.alert('Error', 'Hubo un error al crear la promoción.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={{ paddingHorizontal: 20, width: '100%', flex: 2 }}>
        <View style={styles.rowTitleP}>
          <Text style={styles.titleRecordP}>Crear descuento</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder='Título'
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Descripción</Text>
            <TextInput
              style={styles.input}
              placeholder='Descripción'
              value={description}
              onChangeText={setDescription}
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
            <Text style={styles.inputText}>Producto(s)</Text>
            <TextInput
              style={styles.input}
              placeholder='Buscar producto'
              value={searchTextProduct}
              onChangeText={handleSearchProductChange}
            />
            {searchTextProduct !== '' && (
              <ScrollView style={styles.scrollViewProducts}>
                {filteredProducts.map((item, index) => (
                  <TouchableHighlight
                    key={index}
                    style={styles.buttonScrollviewProduct}
                    underlayColor="#d9d9d9"
                    onPress={() => addSelectedProduct(item)}
                  >
                    <View style={styles.contentRowButtonSCProd}>
                      <View style={styles.contentColumnButtonSCProd}>
                        <Text>{item.nameProduct}</Text>
                      </View>
                      <View style={styles.contentColumnButtonSCProd}>
                        <Text>$ {item.salePrice}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Descuento</Text>
            <TextInput
              style={styles.input}
              placeholder='Descuento'
              value={discount}
              onChangeText={setDiscount}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Crear</Text>
          </TouchableOpacity>
            <View style={{
              flexDirection: 'row', 
              height: 130,
              backgroundColor: 'white', 
              marginHorizontal: 10,
              marginTop: 10, 
              borderRadius: 10, 
              overflow: 'hidden', 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.2, 
              shadowRadius: 4, 
              elevation: 5
            }}>
            <View style={{ flexDirection: 'column', width: '30%' }}>
              {selectedProductName && selectedProduct?.imgProduct &&(
                
                <Image 
                  style={{ width: '100%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} 
                  source={{ uri: `data:image/png;base64,${selectedProduct.imgProduct}` }}
                  resizeMode="contain" 
                />
              )}
            </View>
            <View style={{ flexDirection: 'column', width: '55%', paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
              <Text style={{ color: '#555' }}>Desde: {dateStart.toLocaleDateString()}</Text>
              <Text style={{ color: '#555' }}>Hasta: {dateEnd.toLocaleDateString()}</Text>
              <Text style={{ color: '#333' }}>Descripción: {description}</Text>
              <Text style={{ color: '#333' }}>Precio antes: ${priceProduct}</Text>
              <Text style={{ color: '#333' }}>Precio ahora: ${priceProduct}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: '15%', paddingHorizontal: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>{discount}%</Text>
            </View>
          </View>
        </ScrollView>
        

      </View>
    </View>
  );
}