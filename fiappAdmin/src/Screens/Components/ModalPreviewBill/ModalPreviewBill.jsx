import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext } from 'react';
import { Alert, Linking, Modal, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { UserContext } from '../../../UserContext/UserContext.js';
import styles from './modalPreviewBill';

export default function ModalPreviewBill({ isVisible, onClose, facturaData }) {
  const { store } = useContext(UserContext);

  const handleGenerateInvoice = async () => {
    const invoiceData = {
      fullName: facturaData.customer?.fullName || 'N/A',
      idNumber: facturaData.customer?.idNumber || 'N/A',
      date: facturaData.date || getCurrentDateTime(),
      nameStore: facturaData.nameStore || 'N/A', // Aquí se pasa el nombre de la tienda
      storeId: facturaData.storeId || 'N/A', // Aquí se pasa el id de la tienda
      total: facturaData.total || 0,
      products: facturaData.products || [],
      trusted: facturaData.trusted || false,
    };

    try {
      console.log('Datos enviados:', invoiceData);
      const token = await AsyncStorage.getItem('authToken');
      const storeId = store.id;
      // console.log("Id de la store",storeId)
      if (!storeId) {
        console.error('ID de tienda no disponible en el contexto');
        return;
      }
      const response = await axios.post('http://192.168.0.6:3000/store/invoiceGenerated', invoiceData,{
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera
          'storeId': storeId,
        },
      });
      console.log('Respuesta del servidor:', response.data);

      const downloadUrl = `http://192.168.0.6:3000/store/download/${response.data.fileName}`;
      console.log('Factura generada en:', downloadUrl);

      onClose();
      Alert.alert('Factura generada', 'La factura se ha generado exitosamente.');
      Linking.openURL(downloadUrl);  // Aquí se utiliza Linking para abrir la URL de descarga
    } catch (error) {
      console.error('Error al generar la factura:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo generar la factura. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.rowTitleBill}>
            <Text style={styles.txtBill}>Factura</Text>
          </View>
          <View style={styles.contentDataStore}>
            <View style={styles.rowStore}>
              <View style={styles.columnNameStore}>
                <Text style={styles.txtDataStore}>Tienda: {facturaData?.nameStore || 'N/A'}</Text>
              </View>
              <View style={styles.columnDateStore}>
                <Text style={styles.txtDataStore}>Fecha: {facturaData?.date || getCurrentDateTime()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.contentDataCustomer}>
            <View style={styles.rowCustomer}>
              <View style={styles.columnNameCustomer}>
                <Text style={styles.txtDataCustomer}>Cliente: {facturaData?.customer?.fullName || 'N/A'}</Text>
              </View>
              <View style={styles.columnPhoneCustomer}>
                <Text style={styles.txtDataCustomer}>ID: {facturaData?.customer?.idNumber || 'N/A'}</Text>
              </View>
            </View>
            <View style={styles.rowCustomer}>
              <View style={styles.columnNameCustomer}>
                <Text style={styles.txtDataCustomer}>Fiado: {facturaData?.trusted ? 'Sí' : 'No'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowTitlesTable}>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Producto</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitleAmount}>Und/lbs</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Prc. und</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Prc. Total</Text>
            </View>
          </View>
          <ScrollView>
            {facturaData.products?.map((product, index) => (
              <View key={index} style={styles.rowTitlesTable}>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.Producto}</Text>
                </View>
                <View style={styles.contentTitleAmount}>
                  <Text style={styles.textTitleAmount}>{product.Amount}</Text>
                </View>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.Prc_Und}</Text>
                </View>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.TotalPrice}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.rowContentTotalPrice}>
            <View style={styles.columnTitleTotalPrice}>
              <Text style={styles.txtTitleTotal}>Total</Text>
            </View>
            <View style={styles.columnResultTotalPrice}>
              <Text style={styles.txtResultTotalPrice}>{facturaData?.total || 0}</Text>
            </View>
          </View>
          <View style={styles.rowButtons}>
            <TouchableHighlight onPress={onClose} style={{ backgroundColor: '#D9D9D9', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Atrás</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={handleGenerateInvoice} style={{ backgroundColor: '#33BC82', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Generar factura</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}
