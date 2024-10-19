import React, { useState } from 'react';
import { View, Modal, TouchableHighlight, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity  } from 'react-native';
import styles from './userActionsBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import ModalProfile from './ModalProfile/ModalProfile';
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
    return (
        <View style={styles.container}>
            <View style={styles.rowButtons}>
                <View style={styles.buttonAction}>
                    <TouchableHighlight onPress={handleOpenModalProfile}underlayColor="transparent"style={{ borderRadius: 100, padding: 10 }}>
                        <FontAwesomeIcon icon={faUser} size={25} color={modalProfileV ? "#1F8169" : "black"} />
                    </TouchableHighlight>
                </View>
                <View style={styles.buttonAction}>
                    <TouchableHighlight onPress={handleOpenModalNotification} underlayColor="transparent" style={{ borderRadius: 100, padding: 10 }}>
                        <FontAwesomeIcon icon={faBell} size={25} color={modalNotificationV ? "#1F8169" : "black"} />
                    </TouchableHighlight>
                </View>
            </View>
            <ModalProfile 
                modalProfileV={modalProfileV} 
                handleCloseModalProfileV={handleCloseModalProfileV} 
            />            
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
