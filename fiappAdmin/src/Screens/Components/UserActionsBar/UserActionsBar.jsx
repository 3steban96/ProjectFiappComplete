import React, { useState } from 'react';
import { View, Modal, TouchableHighlight, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity  } from 'react-native';
import styles from './userActionsBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShop, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
export default function UserActionsBar() {
    const [modalProfileV, setModalProfileV] = useState(false);
    const [modalNotificationV, setModalNotificationV] = useState(false);
    const navigation = useNavigation();
  
    const handleOpenModalProfile = () => {
      setModalProfileV(true);
      setModalNotificationV(false); // Cierra el modal de notificación si está abierto
    };
  
    const handleCloseModalProfileV = () => {
      setModalProfileV(false);
    };
  
    const handleOpenModalNotification = () => {
      setModalNotificationV(true);
      setModalProfileV(false); // Cierra el modal de perfil si está abierto
    };
  
    const handleCloseModalNotification = () => {
      setModalNotificationV(false);
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
                <View style={styles.buttonAction}>
                    <TouchableHighlight onPress={handleOpenModalNotification} underlayColor="transparent" style={{ borderRadius: 100, padding: 10 }}>
                        <FontAwesomeIcon icon={faBell} size={30} color={modalNotificationV ? "#1F8169" : "black"} />
                    </TouchableHighlight>
                </View>
            </View>
            <Modal visible={modalProfileV} animationType="fade" transparent={true} onRequestClose={handleCloseModalProfileV} >
                <TouchableWithoutFeedback onPress={handleCloseModalProfileV} >
                    <View style={[styles.modalContainer]}>
                        <View style={styles.modal}>
                            <Text style={styles.textModal}>Tienda:</Text>
                            <Text style={styles.textModal}>Total de ventas hoy:</Text>
                            <Text style={styles.textModal}>Total de fiado hoy:</Text>
                            <View style={{flexDirection:'row',justifyContent:'center',paddingHorizontal:50,paddingTop:10}}>
                                <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}> 
                                    <Text style={styles.textBtnLogOut}>Cerrar sesión</Text> 
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal visible={modalNotificationV} animationType="fade" transparent={true} onRequestClose={handleCloseModalNotification} >
                <TouchableWithoutFeedback onPress={handleCloseModalNotification}>
                    <View style={[styles.modalContainer]}>
                        <View style={styles.modal}>
                            <Text >Notificación</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
