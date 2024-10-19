import React, { useContext } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import styles from './modalProfileStyle';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../UserContext/UserContext';

export default function ModalProfile({ modalProfileV, handleCloseModalProfileV }) {
    const { customer } = useContext(UserContext);  // Obtener datos del usuario
    const navigation = useNavigation();
    const qrCodeUri = customer.qrCode || 'data:image/png;base64,placeholderForTesting';

    const logOut = () => {        
        navigation.navigate('Login');
    }
    // console.log("Datos usuario",customer)
    return (
        <Modal visible={modalProfileV} animationType="fade" onRequestClose={handleCloseModalProfileV} transparent={true}>
            <TouchableWithoutFeedback onPress={handleCloseModalProfileV}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.textModal}>{customer ? customer.fullName : 'Cargando...'}</Text>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <Image source={{ uri: qrCodeUri }} style={{ height: 150, width: 150 }} resizeMode="contain" />
                        </View>

                        
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 50, paddingTop: 10 }}>
                            <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}> 
                                <Text style={styles.textBtnLogOut}>Cerrar sesión</Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
