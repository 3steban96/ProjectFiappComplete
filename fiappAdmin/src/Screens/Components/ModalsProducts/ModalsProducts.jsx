import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './modalsProducts';

export default function ModalsProducts({ isVisible, onClose, productName, priceProduct, onAccept }) { // Asegúrate de recibir `onAccept` como prop
  const [amount, setAmount] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState('unds');
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // Restablecer el estado del input cada vez que se abre el modal
    setAmount('');
  }, [isVisible]); // Dependencia para ejecutar useEffect cuando cambia isVisible


  useEffect(() => {
    const calculateTotalPrice = () => {
      const numericAmount = parseFloat(amount); // Convertir la cantidad a número
      if (!isNaN(numericAmount)) {
        const resultPrice = parseFloat(priceProduct) * numericAmount;
        setTotalPrice(resultPrice);
        
      } else {
        setTotalPrice(0);
      }
    };
    calculateTotalPrice();
  }, [amount, priceProduct]);

  const handleAccept = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      Alert.alert("Ingrese una cantidad o presione cancelar");
    } else {
      const resultPrice = parseFloat(priceProduct) * numericAmount;
      onClose();
      onAccept(resultPrice, numericAmount, selectedUnit);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback>
        <View style={[styles.modalContainer]}>
          <View style={styles.modal}>
            <Text style={{ textAlign: 'center', paddingVertical: 5, fontWeight: 'bold', fontSize: 20 }}>{productName}</Text>
            <Text style={{ paddingVertical: 10, fontWeight: 'bold', fontSize: 18 }}>{`Precio: ${priceProduct}`}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Cantidad:</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <TextInput value={amount} onChangeText={(text) => setAmount(text)} placeholder="Unds/Lbs" keyboardType="numeric" style={{ flex: 1, marginRight: 10 }} />
                <Picker style={{ width: 120 }} selectedValue={selectedUnit} onValueChange={(itemValue, itemIndex) => setSelectedUnit(itemValue)} >
                  <Picker.Item label="Unds" value="unds" />
                  <Picker.Item label="Lbs" value="lbs" />
                </Picker>
              </View>
            </View>
            <Text style={{ paddingVertical: 10, fontWeight: 'bold', fontSize: 18 }}>{`Total: ${totalPrice}`}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={{ backgroundColor: '#D9D9D9', padding: 10, borderRadius: 5 }} onPress={onClose}>
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={{ backgroundColor: '#33BC82', padding: 10, borderRadius: 5 }} onPress={handleAccept}>
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
