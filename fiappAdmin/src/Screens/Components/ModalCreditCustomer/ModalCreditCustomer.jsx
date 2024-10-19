import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { UserContext } from '../../../UserContext/UserContext';
import styles from './modalCreditCustomerStyle';

export default function ModalCreditCustomer({ isVisible, onClose, storeId, idNumber, title, fullName }) { 
    const [creditLimit, setCreditLimit] = useState('');
    const { store } = useContext(UserContext);
    const navigation = useNavigation();
    const handleSave = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
          alert('No se encontró el token de autenticación.');
          return;
      }
  
      const storeId = store.id;
      console.log('Store ID:', storeId);     
      console.log('Customer ID:', idNumber); 
      console.log('Nombre cliente:', fullName); 
      console.log('Store Credit Limit:', creditLimit);
  
      try {
        const response = await axios.post(
          'http://192.168.0.5:3000/store/updateCreditLimit',
          {
              storeId,
              idNumber,
              storeCreditLimit: creditLimit,
          },
          {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          }
        );
  
        if (response.status === 200) {
            alert('Cupo de crédito actualizado exitosamente');
            onClose(); // Cierra el modal
            navigation.goBack();
        } else {
            alert('Error al actualizar el cupo de crédito');
        }
      } catch (error) {
        console.error('Error al actualizar el cupo de crédito:', error);
        alert('Error al actualizar el cupo de crédito');
      }
    };
    const maskIdNumber = (idNumber) => {
      if (!idNumber) return '****';
      const idStr = idNumber.toString();
      return idStr.slice(-4).padStart(idStr.length, '*');
    };
    
    
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          {fullName ? <Text style={styles.subTitle}>{fullName}</Text> : null}          
          <Text style={styles.subTitle}>ID Cliente: {maskIdNumber(idNumber)}</Text>
          <TextInput
            keyboardType="numeric"
            value={creditLimit}
            onChangeText={setCreditLimit}
            placeholder="Ingrese el cupo de crédito"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={onClose} style={styles.cancelButton} underlayColor="#bbb">
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={handleSave} style={styles.saveButton} underlayColor="#28a874">
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
};