import React, { useState, useContext } from 'react';
import { View, Modal, TouchableHighlight, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity  } from 'react-native';
import styles from './userActionsBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShop, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../UserContext/UserContext';
export default function UserActionsBar() {
    const [modalProfileV, setModalProfileV] = useState(false);
    const navigation = useNavigation();
    const { store } = useContext(UserContext);
    console.log("Nombre tienda",store)
    const handleOpenModalProfile = () => {
      setModalProfileV(true);
    };  
    const handleCloseModalProfileV = () => {
      setModalProfileV(false);
    };   

    const logOut = ()=>{        
        navigation.navigate('Login')
    }
    return (
        <View style={styles.container}>
            <View style={styles.rowButtons}>
                <View style={styles.buttonAction}>
                    <TouchableHighlight onPress={handleOpenModalProfile}underlayColor="transparent"style={{ borderRadius: 100, padding: 10 }}>
                        <FontAwesomeIcon icon={faShop} size={30} color={modalProfileV ? "#1F8169" : "black"} />
                    </TouchableHighlight>
                </View>
            </View>
            <Modal visible={modalProfileV} animationType="fade" transparent={true} onRequestClose={handleCloseModalProfileV}>
              <TouchableWithoutFeedback onPress={handleCloseModalProfileV}>
                <View style={styles.overlay}>
                  <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Perfil de Tienda</Text>
                    
                    <View style={styles.profileInfo}>
                      <Text style={styles.textModal}>Nombre: {store.nameStore}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}> 
                        <Text style={styles.textBtnLogOut}>Cerrar sesión</Text> 
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
