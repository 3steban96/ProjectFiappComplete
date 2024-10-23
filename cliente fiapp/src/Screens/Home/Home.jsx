import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, StatusBar, Text, View } from 'react-native';
import ComboCarousel from '../../Components/CarouselCombos/CarouselCombos.jsx';
import StoresAssociated from '../../Components/StoresAssociated/StoresAssociated.jsx';
import UserActionsBar from '../../Components/UserActionsBar/UserActionsBar.jsx';
import { UserContext } from '../../UserContext/UserContext.js';
import styles from './homeStyle.js';

export default function Home() {
  const { customer } = useContext(UserContext);
  const [stores, setStores] = useState([]); // Estado para almacenar las tiendas
  const [loading, setLoading] = useState(true); // Estado para manejar el cargado de datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const {width, height} = Dimensions.get("window");

  useFocusEffect(
    React.useCallback(() => {
      const fetchStoresAssociated = async () => {
        try {
          setLoading(true); // Iniciar el estado de carga
          const token = await AsyncStorage.getItem('authToken');
          const customerId = customer.id; 
          const response = await fetch(`http://192.168.0.6:3000/customer/getStoresAssociatedCustomer/${customerId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          
          if (response.ok) {
            setStores(data); // Almacenar los datos de las tiendas en el estado
          } else {
            setError(data.message || 'Error fetching stores');
          }
        } catch (error) {
          setError('Error fetching stores'); // Guardar cualquier error en el estado
        } finally {
          setLoading(false); // Finalizar el estado de carga
        }
      };
      
      fetchStoresAssociated();
    }, [customer.id]) // Se vuelve a ejecutar cuando cambia el ID del cliente
  );

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (loading) {
    return <Text>Cargando tiendas asociadas...</Text>;
  }

  // Mostrar el mensaje de error si ocurre alguno
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <UserActionsBar style={styles.styleCompUserAB} />      
      <View style={{ flex:1}}>
        <Text style={styles.title}>Te puede interesar</Text>
        <ComboCarousel /> 
      </View>           
      <View style={styles.scrollView}>
        <Text style={styles.title}>Tiendas Asociadas</Text>
        <FlatList
          data={stores} 
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => (
            <StoresAssociated store={item} customerId={customer.id} /> 
          )}
        />
      </View>
    </View>
  );
}
