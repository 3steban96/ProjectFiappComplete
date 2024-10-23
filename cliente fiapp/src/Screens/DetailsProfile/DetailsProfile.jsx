import React, { useContext } from 'react';
import { Dimensions, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, DataTable } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext.js';
import styles from './detailsProfileStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from 'date-fns';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function DetailsProfile() {
  const { customer,fullName, email, phone, idNumber, globalCreditLimit } = useContext(UserContext); // Obtener el customer desde el contexto
  console.log("customer",customer.id)
  console.log("fullName",fullName)
  console.log("email",email)
  console.log("phone",phone)
  console.log("idNumber",idNumber)
  console.log("setGlobalCreditLimit",globalCreditLimit)
  // Asegúrate de que el customer esté disponible antes de renderizar
  const { width } = Dimensions.get('window');
  const [purchases, setPurchases] = React.useState([]); // Estado para las facturas
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 8; // Número fijo de ítems por página
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, purchases.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const maskIdNumber = (idNumber) => {
    if (!idNumber) return '****';
    const idStr = idNumber.toString();
    return idStr.slice(-4).padStart(idStr.length, '*');
  };
  React.useEffect(() => {
    const fetchCustomerInvoices = async () => {
      const token = await AsyncStorage.getItem('authToken');

      try {
        const response = await axios.get(
          `http://192.168.0.6:3000/customer/getInvoicesCustomer/${customer.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        console.log("Facturas consultadas", response.data)
        setPurchases(response.data); // Actualizar las facturas obtenidas
      } catch (error) {
        console.error('Error buscando facturas del cliente:', error);
      }
    };
  
    fetchCustomerInvoices();
  }, [customer.id]);
  const downloadInvoice = async (customerId, fileName) => {
    try {
      // Solicitar permisos de almacenamiento
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere permiso para acceder al almacenamiento.');
        return;
      }
  
      const token = await AsyncStorage.getItem('authToken');  
      const response = await axios.get(
        `http://192.168.0.6:3000/customer/downloadInvoiceCustomer/${customerId}/${fileName}`,
        {
          responseType: 'arraybuffer', 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      // Convertir el arraybuffer a base64
      const base64 = Buffer.from(response.data, 'binary').toString('base64');
  
      // Usar el directorio de descargas de Android
      const downloadDir = FileSystem.cacheDirectory + fileName;  // Usa cacheDirectory o el directorio temporal
      await FileSystem.writeAsStringAsync(downloadDir, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      console.log('Factura descargada en:', downloadDir);
  
      // Crear asset en la carpeta de Descargas
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadDir);
      } else {
        console.warn('La funcionalidad de compartir no está disponible en este dispositivo.');
      }
  
    } catch (error) {
      console.error('Error al descargar la factura:', error);
    }
  };
  
  const formatDate = (date) => {
    try {
      return format(new Date(date), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formateando la fecha:', error);
      return 'Fecha inválida';
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={{ margin: 20 }}>
          <View style={{ marginTop: 60 }}>
            <Card style={{ height: 'auto', width: width * 0.9, backgroundColor: 'white' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', height: 20 }}>
                <Avatar.Image size={74} style={{ top: -50 }} source={require('../../../Avatar.jpg')} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{fullName || 'Nombre no disponible'}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{maskIdNumber(idNumber)}</Text>
              </View>
              <Card.Content style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1 }}>Correo:</Text>
                  <Text style={{ textAlign: 'right', flex: 4, flexWrap: 'wrap' }} numberOfLines={1} ellipsizeMode="tail">
                    {email || 'Correo no disponible'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ flex: 1 }}>Celular:</Text>
                    <Text style={{ textAlign: 'right', flex: 4, flexWrap: 'wrap', flexDirection: 'column' }} numberOfLines={1} ellipsizeMode="tail">
                      {phone || 'No disponible'}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ flex: 1 }}>Cupo global:</Text>
                  <Text style={{ textAlign: 'right', flex: 1, flexWrap: 'wrap' }} numberOfLines={2} ellipsizeMode="tail">
                    ${globalCreditLimit || 'No disponible'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ flex: 1 }}>Deuda global:</Text>
                  <Text style={{ textAlign: 'right', flex: 1, flexWrap: 'wrap' }} numberOfLines={2} ellipsizeMode="tail">
                    ${globalCreditLimit || 'No disponible'}
                  </Text>
                </View>
              </Card.Content>
            </Card>
            <View style={styles.rowTitleP}>
          <Text style={styles.titleRecordP}>Compras realizadas</Text>
        </View>
        <View style={{width:'100%',paddingHorizontal:0}}>
          <DataTable style={{backgroundColor:'white', borderRadius:10}}>
            <DataTable.Header >
              <DataTable.Title >Tienda</DataTable.Title>
              <DataTable.Title >Fecha</DataTable.Title>
              <DataTable.Title textStyle={{textAlign:'center',width:'100%'}}>Fiado</DataTable.Title>
              <DataTable.Title textStyle={{textAlign:'center',width:'100%'}}>Total</DataTable.Title>
              <DataTable.Title textStyle={{textAlign:'center',width:'100%'}}>Factura</DataTable.Title>
            </DataTable.Header>
            {purchases.slice(from, to).map((purchase) => (
              <DataTable.Row key={purchase.id}>
                <DataTable.Cell textStyle={{textAlign:"left",width:'100%'}}numeric>{purchase.stores?.nameStore || 'Sin nombre'}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize:10}}>{formatDate(purchase.purchaseDate)}</DataTable.Cell>
                <DataTable.Cell textStyle={{textAlign:'center',width:'100%'}}>{purchase.trusted ? 'Sí' : 'No'}</DataTable.Cell>
                <DataTable.Cell textStyle={{textAlign:'center',width:'100%'}}>{purchase.total}</DataTable.Cell>
                <DataTable.Cell textStyle={{textAlign:'center',width:'100%'}}>
                  <TouchableOpacity onPress={() => downloadInvoice(customer.idNumber, purchase.purchaseDocument)}>
                    <Text style={{ color: 'blue' }}>Descargar</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(purchases.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} de ${purchases.length}`}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={() => {}}
              showFastPaginationControls
              selectPageDropdownLabel={'Filas por página'}
            />
          </DataTable>
          </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
