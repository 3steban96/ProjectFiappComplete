import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../UserContext/UserContext';
import ModalCreditCustomer from '../Components/ModalCreditCustomer/ModalCreditCustomer';
import styles from './addCustomerStyle';

export default function AddCustomer() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [fullName, setFullName] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const { store } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const storeId = store.id;
    const idNumber = data; 
    setScanned(true);
    setScannedData(data);
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      alert('No se encontró el token de autenticación.');
      return;
    }

    try {
      // Realiza la solicitud con storeId y idNumber
      const response = await axios.post('http://192.168.0.9:3000/store/associateCustomer', {
          storeId,
          idNumber,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera
          }
        }
      );

      // Verifica la respuesta del servidor
      if (response.status === 200) {
        // Asigna el fullName desde la respuesta del servidor
        setFullName(response.data.fullName); // Asegúrate que el servidor devuelva el fullName

        // Abre el modal para ingresar el cupo de crédito
        setModalVisible(true);
      } else if (response.status === 409) { // Maneja el código de conflicto (409)
        alert('El cliente ya fue asociado a esta tienda');
      }
    } catch (error) {
      console.error('Error al asociar cliente:', error);

      if (error.response && error.response.status === 409) {
        // El cliente ya está asociado
        alert('El cliente ya fue asociado a esta tienda');
      } else {
        alert('Error al asociar cliente');
      }
      // Regresa a la pantalla anterior incluso en caso de error
      navigation.goBack();
    }
  };


  if (hasPermission === null) {
    return <Text>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && ( 
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(false)}}>
        <ModalCreditCustomer        
          onClose={() => setModalVisible(false)} 
          storeId={store.id} 
          idNumber={scannedData}
          fullName={fullName}  
          title="Por favor confirma los datos antes de asignarle un cupo"           
        />
      </Modal>
    </View>
  );
}
