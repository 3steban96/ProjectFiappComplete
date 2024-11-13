import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'
import styles from './modalEditProduct'
import { TextInput } from 'react-native'
export default function ModalEditProducts({ isVisible, onClose, product, onEdit }) {
    const [purchasePrice, setPurchasePrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [amount, setAmount] = useState('');
  
    useEffect(() => {
      if (product) {
        setPurchasePrice(product.purchasePrice.toString());
        setSalePrice(product.salePrice.toString());
        setAmount(product.amount.toString());
      }
    }, [product]);
  
    const handleUpdate = () => {
      const updatedProduct = {
        ...product,
        purchasePrice: parseFloat(purchasePrice),
        salePrice: parseFloat(salePrice),
        amount: parseFloat(amount)
      };
      onEdit(updatedProduct);
    };
    return (
        <Modal visible={isVisible} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.rowTitleProduct}>
                <Text style={styles.txtProduct}>{product ? product.nameProduct : ''}</Text>
              </View>
              <View style={styles.contentDataProduct}>
                <View style={styles.rowProduct}>
                  <View style={styles.columnPriceProduct}>
                    <Text style={styles.txtPriceProduct}>Compra:</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder='Precio de compra'
                      value={purchasePrice}
                      onChangeText={setPurchasePrice}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.columnPriceProduct}>
                    <Text style={styles.txtPriceProduct}>Venta:</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder='Precio de venta'
                      value={salePrice}
                      onChangeText={setSalePrice}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.columnPriceProduct}>
                    <Text style={styles.txtPriceProduct}>Disponible:</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder='Disponible'
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                      />
                  </View>
                </View>
              </View>
              <View style={styles.rowButtons}>
                <TouchableHighlight onPress={onClose} style={{ backgroundColor: '#D9D9D9', padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white' }}>Cancelar</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={handleUpdate} style={{ backgroundColor: '#33BC82', padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white' }}>Actualizar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      );
}
