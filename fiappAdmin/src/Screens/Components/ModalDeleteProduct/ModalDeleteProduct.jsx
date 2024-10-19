import React from 'react';
import { View, Text, Modal, TouchableHighlight } from 'react-native';
import styles from './modalDeleteProduct';
export default function ModalDeleteProduct({ isVisible, onClose, product, onDelete }) {


  return (
    <Modal visible={isVisible} animationType="fade" transparent >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.rowTitleProduct}>
            <Text style={styles.txtProduct}>{product ? product.nameProduct : ''}</Text>
          </View>
          <View style={styles.contentDataProduct}>
            <View style={styles.rowProduct}>
              <View style={styles.columnPriceProduct}>
                <Text style={styles.txtPriceProduct}>¿Deseas eliminar este producto?</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowButtons}>
          <TouchableHighlight onPress={onClose} style={{ backgroundColor: '#D9D9D9', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={onDelete} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Aceptar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}
