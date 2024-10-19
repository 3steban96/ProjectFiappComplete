import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, View } from 'react-native';
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
      alert('No seleccionaste ninguna imagen.');
    }
  };

  const handleSubmit = async () => {
    // Validación de campos
    if (!nameProduct || !category || !purchasePrice || !salePrice || !company || !phone || !address || !image) {
      alert('Por favor, complete todos los campos y seleccione una imagen.');
      return;
    }

    // Preparar datos para enviar al servidor
    const formData = new FormData();
    formData.append('nameP', nameProduct);
    formData.append('categoryP', category);
    formData.append('purchasePriceP', purchasePrice);
    formData.append('salesPriceP', salePrice);
    formData.append('companyS', company);
    formData.append('numberS', phone);
    formData.append('addressS', address);
    formData.append('imgProduct', {
      uri: image,
      name: `product.${image.split('.').pop()}`,
      type: 'image/jpeg'
    });

    try {
      // Enviar datos al servidor
      const response = await axios.post('http://192.168.0.67:3000/store/postProducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Notificar éxito y limpiar campos
      alert('Producto registrado exitosamente');
      clearFields();
    } catch (error) {
      console.error(error);
      alert('Error al registrar el producto');
    }
  };

  const clearFields = () => {
    setNameProduct('');
    setCategory('');
    setPurchasePrice('');
    setSalePrice('');
    setCompany('');
    setPhone('');
    setAddress('');
    setImage(null);
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
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          >
            <Picker.Item label="Selecciona una categoría" value="" />
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Imagen</Text>
          <Button title="Seleccionar Imagen" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Precio de compra</Text>
          <TextInput style={styles.input} placeholder='Precio de compra' keyboardType='numeric' value={purchasePrice} onChangeText={setPurchasePrice} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Precio de venta</Text>
          <TextInput style={styles.input} placeholder='Precio de venta' keyboardType='numeric' value={salePrice} onChangeText={setSalePrice} />
        </View>
        <View style={styles.rowTitle}>
          <Text style={styles.txtTitle}>Datos del proveedor</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Empresa / Proveedor</Text>
          <TextInput style={styles.input} placeholder='Empresa / Proveedor' value={company} onChangeText={setCompany} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Numero de contacto</Text>
          <TextInput style={styles.input} placeholder='Numero de contacto' keyboardType='numeric' value={phone} onChangeText={setPhone} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Dirección</Text>
          <TextInput style={styles.input} placeholder='Dirección' value={address} onChangeText={setAddress} />
        </View>
        <TouchableHighlight style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar producto</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}
