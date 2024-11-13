import React,{useState, useEffect} from 'react';
import { Text, View, Modal, ScrollView, TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import styles from './modalCartShopStyle';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { red100, red500 } from 'react-native-paper/src/styles/themes/v2/colors';

export default function ModalCartShop({ isVisible, onClose, facturaData, handleDeleteProduct,handleSendProductsWhatsapp }) {
  useEffect(() => {
    const saveProductsToStorage = async () => {
      try {
        // Guarda los productos en AsyncStorage
        await AsyncStorage.setItem('cartProducts', JSON.stringify(facturaData.products));
      } catch (error) {
        console.error('Error guardando los productos en AsyncStorage:', error);
      }
    };

    if (facturaData.products?.length > 0) {
      saveProductsToStorage();
    }
  }, [facturaData.products]);
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <View style={styles.rowTitleBill}>
                <Text style={styles.txtBill}>Productos Agregados</Text>
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
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>Eliminar</Text>
                </View>
              </View>
              <ScrollView>
                {facturaData.products?.length > 0 ? (
                  facturaData.products.map((product, index) => (
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
                      <View style={styles.contentTitle}>
                        <Button
                          textColor={red500}
                          // rippleColor={red100}
                          title="Eliminar"
                          onPress={() => handleDeleteProduct(index)} // Llama a la función pasada desde el padre
                          icon="trash-can"
                        />
                      </View>
                    </View>
                  ))
                ) : (
                  <Text>No hay productos en el carrito</Text>
                )}
              </ScrollView>
              <Button onPress={handleSendProductsWhatsapp}>Enviar pedido</Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
