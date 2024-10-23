import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './storesAssociatedStyle.js'
import { Card, Title, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default function StoresAssociated({ store, customerId }) {
  const navigation = useNavigation(); 
  const { nameStore, id: storeId } = store;
  
  const handleSelectedStore = () => {
    // Aquí también enviamos el nameStore
    navigation.navigate('StoreSelected', { storeId, customerId, nameStore });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={handleSelectedStore}>
          <View style={styles.cardContent}>
            <Image source={require('../../../assets/icons/store.png')} style={{ height:48,width:48 }}/>
            <View style={styles.textContainer}>
              <Title style={styles.storeName}> {nameStore}</Title>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}
