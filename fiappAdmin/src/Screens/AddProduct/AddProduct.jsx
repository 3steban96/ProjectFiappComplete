import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../UserContext/UserContext';
import styles from './addProduct';

export default function AddProduct() {
  const [nameProduct, setNameProduct] = useState('');
  const [category, setCategory] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);  
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTextSupplier, setSearchTextSupplier] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [amount, setAmount] = useState('');
  const [unitType, setUnitType] = useState('Unds');
  const { store } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  
  const handleSubmit = async () => {
    if (!nameProduct || !category || !purchasePrice || !salePrice || !company || !phone || !address || !image || !amount || !unitType) {
      alert('Por favor, complete todos los campos y seleccione una imagen.');
      return;
    }

    if (!store || !store.id) { // Verificar que el store y storeId existan
      alert('No se encontró el ID de la tienda. Por favor, inicie sesión nuevamente.');
      return;
    }

    const formData = new FormData();
    formData.append('nameP', nameProduct);
    formData.append('categoryP', category);
    formData.append('purchasePriceP', purchasePrice);
    formData.append('salesPriceP', salePrice);
    formData.append('amountP', amount);
    formData.append('unitTypeP', unitType);
    formData.append('companyS', company);
    formData.append('numberS', phone);
    formData.append('addressS', address);
    formData.append('storeId', store.id); // Enviar storeId desde el contexto
    formData.append('imgProduct', {
      uri: image,
      name: `product.${image.split('.').pop()}`,
      type: 'image/jpeg',
    });

    console.log("AgregarProducto", formData);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post('http://192.168.0.6:3000/store/postProducts', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
          },
      });
      alert('Producto registrado exitosamente');
      setNameProduct('');
      setCategory('');
      setAmount('');
      setUnitType('');
      setPurchasePrice('');
      setSalePrice('');
      setCompany('');
      setPhone('');
      setAddress('');
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Error al registrar el producto');
    }
  };
  

  useEffect(() => {
    const mockCategories = [
      'Frutas y verduras',
      'Carnes y pescados',
      'Lacteos y huevos',
      'Panadería y repostería',
      'Granos, pasta y legumbres',
      'Cereales',
      'Bebidas',
      'Snacks y dulces',
      'Condimentos',
      'Bebidas alcohólicas'
    ];
    setCategories(mockCategories);
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {

      if (!store || !store.id) { // Verificar que el store y storeId existan
        alert('No se encontró el ID de la tienda. Por favor, inicie sesión nuevamente.');
        return;
      }
      const token = await AsyncStorage.getItem('authToken');
      const storeId = store.id;

      try {
        const response = await axios.get('http://192.168.0.6:3000/store/getSuppliers',{
          headers: {
            'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
            'storeId': storeId 
          }
        });
        // console.log(response.data); // Añade este log para verificar los datos
        const sortedSuppliers = response.data.sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
          return 0; // Si `name` no está definido, no realizar el ordenamiento
        });
        setSuppliers(sortedSuppliers);
      } catch (error) {
        console.error('Error buscando proveedores:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleSearchSupplierChange = (text) => {
    setSearchTextSupplier(text);
    const filtered = suppliers.filter((supplier) =>
      supplier.company.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleSupplierSelect = (supplier) => {
    setCompany(supplier.company);
    setPhone(supplier.phone);
    setAddress(supplier.address);
    setSearchTextSupplier(supplier.company);
    setFilteredSuppliers([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.rowTitle}>
        <Text style={styles.txtTitle}>Registro de productos</Text>
      </View>
      <ScrollView style={{ height: 'auto' }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Nombre del producto</Text>
          <TextInput style={styles.input} placeholder='Producto' value={nameProduct} onChangeText={setNameProduct} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Categoria</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Selecciona una categoría" value="" />
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>      
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Precio de compra</Text>
          <TextInput style={styles.input} placeholder='Precio de compra' keyboardType='numeric' value={purchasePrice} onChangeText={setPurchasePrice} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Precio de venta</Text>
          <TextInput style={styles.input} placeholder='Precio de venta' keyboardType='numeric' value={salePrice} onChangeText={setSalePrice} />
        </View>
        <View style={{ paddingVertical: 10, marginHorizontal: 20 }}>
          <TouchableOpacity onPress={pickImage} style={{ flexDirection: 'row', backgroundColor: 'black', justifyContent: 'space-evenly', borderRadius: 5, padding: 10 }} >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Entypo name="upload" size={24} color="white" />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Agregar imagen</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowTitle2}>
          <Text style={styles.txtTitle}>Cantidad a ingresar</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
          <View style={{width:'50%'}}>
            <Text style={styles.inputText}>Cantidad</Text>
            <TextInput  style={styles.inputAmount}placeholder='#' keyboardType='numeric' value={amount} onChangeText={setAmount} />
          </View>
          <View >
            <Text style={styles.inputText}>Tipo de unidad</Text>
            <View style={styles.pickerUnitType}>
              <Picker style={{ width: 120 }} selectedValue={unitType} onValueChange={(itemValue, itemIndex) => setUnitType(itemValue)} >
                <Picker.Item  label="Unds" value="Unds" />
                <Picker.Item  label="Lbs" value="Lbs" />
              </Picker>
            </View>

          </View>
        </View> 
        <View style={styles.rowTitle}>
          <Text style={styles.txtTitle}>Previsualización</Text>
        </View>
        <View style={{borderWidth:1, marginHorizontal:20, borderRadius:10}}>
        <View style={{ marginHorizontal: 10, marginTop: 10, borderRadius: 10, marginBottom: 30, flexDirection:'row', width:'100%', height:'auto', justifyContent:'space-around', paddingTop:15, paddingHorizontal:5 }}>
          <View style={{ flexDirection: 'column' }}>
            {image && <Image source={{ uri: image }} style={{ width: 70, height: 80 }} />}            
          </View>
          <View style={{flexDirection: 'column',width:'50%',justifyContent:'flex-start'}}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{nameProduct}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>Precio de compra: ${purchasePrice}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>Precio de venta: ${salePrice}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>Cantidad disponible: {amount} {unitType}</Text>
              </View>
            </View>
          </View>
        </View>
        </View>
        <View style={styles.rowTitle}>
          <Text style={styles.txtTitle}>Datos del proveedor</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Empresa / Proveedor</Text>
          <TextInput behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.input} placeholder='Empresa / Proveedor' value={searchTextSupplier} onChangeText={handleSearchSupplierChange} />
          {filteredSuppliers.length > 0 && (
            <ScrollView style={styles.scrollViewProducts}>
              {filteredSuppliers.map((supplier, index) => (
                <TouchableOpacity style={styles.buttonScrollviewProduct} key={index} onPress={() => handleSupplierSelect(supplier)}>
                  <Text style={styles.contentColumnButtonSCProd}>{supplier.company}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Numero de contacto</Text>
          <TextInput style={styles.input} placeholder='Numero de contacto' keyboardType='numeric' value={phone} onChangeText={(text) => {
            setPhone(text);
            setCompany(searchTextSupplier);
          }} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Dirección</Text>
          <TextInput style={styles.input} placeholder='Dirección' value={address} onChangeText={(text) => {
            setAddress(text);
            setCompany(searchTextSupplier);
          }} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar producto</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}