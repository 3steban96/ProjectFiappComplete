import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext.js';
import UserActionsBar from '../Components/UserActionsBar/UserActionsBar.jsx';
import styles from './customersStyle';

export default function Customers({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTextCustomer, setSearchTextCustomer] = useState('');
  const { store } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCustomers = async () => {
        const token = await AsyncStorage.getItem('authToken');
        const storeId = store.id;
        if (!storeId) {
          console.error('ID de tienda no disponible en el contexto');
          return;
        }
        try {
          const response = await axios.get('http://192.168.0.5:3000/store/getCustomers', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'storeId': storeId,
            },
          });
          setCustomers(response.data);
          setFilteredCustomers(response.data);
        } catch (error) {
          console.error('Error buscando clientes:', error);
        }
      };
      fetchCustomers();
    }, [store])
  );

  const handleSearchCustomerChange = (text) => {
    setSearchTextCustomer(text);
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const selectCustomer = (customer) => {
    // Navega a DetailsCustomer y pasa los datos del cliente seleccionado
    navigation.navigate('DetailsCustomer', { customer });
  };

  const maskIdNumber = (idNumber) => {
    if (!idNumber) return '****';
    const idStr = idNumber.toString();
    return idStr.slice(-4).padStart(idStr.length, '*');
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <UserActionsBar style={styles.styleCompUserAB} />

      <View style={styles.rowTitleP}>
        <Text style={styles.titleRecordP}>Clientes</Text>
      </View>
      <View style={styles.rowTextInput}>
        <TextInput
          placeholder="Nombre del cliente"
          style={styles.inputRecordP}
          value={searchTextCustomer}
          onChangeText={handleSearchCustomerChange}
        />
      </View>

      <View style={styles.rowContentCustomers}>
      <View style={styles.contentSCCustomer}>
        <FlatList
          data={filteredCustomers}
          keyExtractor={(customer) => customer.id.toString()} // Mejor clave única
          renderItem={({ item: customer }) => (
            <Card style={styles.btnSelectCustomer}>
              <View style={styles.containerCard}>
                {/* Avatar */}
                <Avatar.Image size={74} style={{backgroundColor:'white'}} source={require('../../../Avatar.jpg')} />

                {/* Información del cliente */}
                <View style={styles.textContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.label} numberOfLines={1} ellipsizeMode="clip">
                      {customer.fullName}
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.labelI} numberOfLines={1} ellipsizeMode="clip">
                    {customer.typeDocument}: {maskIdNumber(customer.idNumber)}
                    </Text>
                  </View>
                  <Button style={{backgroundColor:'black',color:'white'}} onPress={() => selectCustomer(customer)}>
                    <Text style={{color:'white'}}>Ver detalles</Text>                    
                  </Button>
                  
                </View>
              </View>
            </Card>
          )}
        />
      </View>
    </View>

      <View style={styles.rowBtnAddProduct}>
        <TouchableOpacity style={styles.btnAddProduct} onPress={() => navigation.navigate('AddCustomer')}>
          <Text style={styles.txtBtnAddProduct}>Agregar cliente</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
