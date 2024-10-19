import React from 'react';
import { View, Text } from 'react-native';
import StoreSelected from '../../Components/StoreSelected/StoreSelected'; // O donde tengas este componente

export default function ProductsStoreSelected({ route }) {
  const { storeId, customerId, nameStore } = route.params;

  return (
    <View style={{flex:1}}>
      {/* Pasamos nameStore como prop a StoreSelected */}
      <StoreSelected store={{ id: storeId, nameStore }} onCategorySelect={(category) => {
        console.log(`Categoria seleccionada: ${category}`);
      }} />
    </View>
  );
}
