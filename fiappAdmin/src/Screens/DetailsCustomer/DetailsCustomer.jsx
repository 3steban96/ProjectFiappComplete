// DetailsCustomer.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useContext } from 'react';
import { Dimensions, Linking, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, DataTable } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext.js';
import FabButtondProfile from '../Components/FabButtonsProfile/FabButtonsProfile';
import styles from './detailsCustomer';

export default function DetailsCustomer({ route }) {
  const { customer } = route.params; // Obtén el cliente de los parámetros de navegación
  const [page, setPage] = React.useState(0);
  // const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const { store } = useContext(UserContext);
  const [purchases, setPurchases] = React.useState([]); // Estado para las facturas

  const itemsPerPage = 8; // Número fijo de ítems por página
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, purchases.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const { width, height } = Dimensions.get('window');

  const maskIdNumber = (idNumber) => {
    if (!idNumber) return '****';
    const idStr = idNumber.toString();
    return idStr.slice(-4).padStart(idStr.length, '*');
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formateando la fecha:', error);
      return 'Fecha inválida';
    }
  };
 // Fetch de las facturas del cliente
 React.useEffect(() => {
  const fetchCustomerInvoices = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const storeId = store.id;
    if (!storeId) {
      console.error('ID de tienda no disponible en el contexto');
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.0.6:3000/store/getCustomerInvoicesForStore/${customer.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'storeId': storeId,
          },
        }
      );
      setPurchases(response.data); // Actualizar las facturas obtenidas
    } catch (error) {
      console.error('Error buscando facturas del cliente:', error);
    }
  };

  fetchCustomerInvoices();
}, [customer.id, store.id]);
const downloadInvoice = async (customerId, fileName) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const storeId = store.id;

    if (!storeId) {
      console.error('ID de tienda no disponible en el contexto');
      return;
    }

    const response = await axios.get(
      `http://192.168.0.6:3000/store/downloadInvoice/${customerId}/${fileName}`,
      {
        responseType: 'arraybuffer', // usa arraybuffer en lugar de blob
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera
          'storeId': storeId,
        },
      }
    );

    // Convertir el arraybuffer a base64
    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    // Obtener la carpeta de descargas predeterminada en Android
    const fileUri = `${FileSystem.documentDirectory}download/${fileName}`;

    // Escribir el archivo en la carpeta de descargas
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log('Factura descargada en:', fileUri);

    // Abrir la carpeta de descargas para ver el archivo
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.warn("La funcionalidad de compartir no está disponible en este dispositivo.");
    }

  } catch (error) {
    console.error('Error downloading invoice:', error);
  }
};
  const handleCallCustomer = (phone) => {
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
      <ScrollView style={{marginBottom:20}}>      
        <View style={{margin:20}}>
          <View style={{marginTop:60}}>
            <Card style={{height:'auto', width:width*0.9, backgroundColor:'white'}}  >
              <View style={{flexDirection:'row',justifyContent:'center', height:20}}>
                <Avatar.Image size={74} style={{top:-50 }}source={require('../../../Avatar.jpg')} />
              </View>
              <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                <Text style={{fontWeight:'bold', textAlign:'center'}}>{customer.fullName}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', textAlign:'center'}}>{maskIdNumber(customer.idNumber)}</Text>
              </View>
              <Card.Content style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1 }}>Correo:</Text>
                  <Text style={{ textAlign: 'right', flex: 4, flexWrap: 'wrap' }} numberOfLines={1} ellipsizeMode="tail">
                  {customer.email}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ flex: 1 }}>Celular:</Text>
                  <TouchableOpacity onPress={() => handleCallCustomer(customer.phone)}>
                    <Text style={{ textAlign: 'right', flex: 4, flexWrap: 'wrap',textDecorationLine:"underline",flexDirection:'column'  }} numberOfLines={1} ellipsizeMode="tail">
                      {customer.phone}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ flex: 1 }}>Cupo:</Text>
                  <Text style={{ textAlign: 'right', flex: 1, flexWrap: 'wrap' }} numberOfLines={2} ellipsizeMode="tail">
                    ${customer.stores[0]?.CustomerStore?.storeCreditLimit || 'No disponible'}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ flex: 1 }}>Fecha de pago</Text>
                  <Text style={{ textAlign: 'right', flex: 1, flexWrap: 'wrap' }} numberOfLines={2} ellipsizeMode="tail">
                    12/10/2024
                  </Text>
                </View> */}
              </Card.Content>
            </Card>
          </View>
        </View>     
        <View style={styles.rowTitleP}>
          <Text style={styles.titleRecordP}>Compras realizadas</Text>
        </View>
        <View style={{width:'100%',paddingHorizontal:20}}>
          <DataTable style={{backgroundColor:'white', borderRadius:10}}>
            <DataTable.Header >
              <DataTable.Title >Id</DataTable.Title>
              <DataTable.Title >Fecha</DataTable.Title>
              <DataTable.Title textStyle={{textAlign:'center',width:'100%'}}>Fiado</DataTable.Title>
              <DataTable.Title textStyle={{textAlign:'center',width:'100%'}}>Total</DataTable.Title>
              <DataTable.Title textStyle={{textAlign:'center',width:'100%'}}>Factura</DataTable.Title>
            </DataTable.Header>

            {purchases.slice(from, to).map((purchase) => (
              <DataTable.Row key={purchase.id}>
                <DataTable.Cell textStyle={{textAlign:"left",width:'100%'}}numeric>{purchase.id}</DataTable.Cell>
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
      </ScrollView>
      <FabButtondProfile idNumber={customer.idNumber}/>
    </View>
  );
}
