import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext';
import styles from './loginStyle';
export default function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setStore, setNameStore } = useContext(UserContext); 
    const navigation = useNavigation(); 

    const handlePressLogin = async () => {
        if (!email || !password) {
            Alert.alert('Por favor, ingrese correo electrónico y contraseña');
            return;
        }
        try {
            // Enviar solicitud de login al backend
            const response = await axios.post('http://192.168.0.5:3000/store/login', {
                email,
                password
            });
            // Manejar la respuesta
            const { token, store } = response.data; // `nameStore` está en `store`

            console.log('Usuario recibido:', store);
            console.log('Token recibido:', token);

            // Establecer la información en el contexto
            setStore({ ...store, storeId: store.id }); 
            setNameStore(store.nameStore); // Asegúrate de usar el nombre correcto aquí

            // Almacenar el token y el nombre del usuario en AsyncStorage
            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('nameStore', store.nameStore); // Usa `nameStore` aquí

            // Opcional: Ejecutar la función handleLogin si la pasas como prop
            if (handleLogin) {
                handleLogin(token);
            }

            // Navegar a la pantalla de tabs después de un inicio de sesión exitoso
            navigation.navigate('Tabs');
        } catch (error) {
            console.error('Error en el login:', error);
            Alert.alert('Error al iniciar sesión', 'Correo electrónico o contraseña incorrectos.');
        }
    };
  return (
    <View style={styles.container}>
        <StatusBar/>
        {/* <View style={styles.rowTitleLogin}>
            <Text style={styles.titleLogin}>Iniciar sesión</Text>
        </View> */}
        <View style={styles.logoContainer}>
            <Image 
                style={styles.logo} 
                source={require('../../../assets/IconScreenLoginFiapp.png')} 
                resizeMode="contain" // Esto mantiene la proporción original de la imagen
            />
        </View>
        <View style={styles.containerInputs}>
            <View style={styles.containerRowInputs}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={{width:'100%',backgroundColor:'white',borderRadius:20}}
                        label='Correo electronico'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        cursorColor="#1F8169"
                        activeUnderlineColor="#1F8169"
                        underlineColor="#1F8169"    
                    />
                </View>
            </View>
            <View style={styles.containerRowInputs}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={{width:'100%',backgroundColor:'white',borderRadius:20}}
                        label='Contraseña'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        cursorColor="#1F8169"
                        activeUnderlineColor="#1F8169"
                        underlineColor="#1F8169"
                        secureTextEntry={!showPassword}
                        right={
                            <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} 
                            onPress={()=> setShowPassword(!showPassword)} 
                        />}        
                    />
                </View>
            </View>
            <View style={styles.containerRowButtonLogin}>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={handlePressLogin} style={{width:'100%',height:'100%',justifyContent:"center",alignItems:"center"}}>
                        <Text>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>                
            </View>
            <View style={styles.containerRowButtoSignIn}>
                <View style={styles.containerTextButtonSI}>                    
                    <Text>¿No tienes una cuenta? </Text>                    
                </View>                
                <View style={styles.containerTextButtonSI}>
                    <TouchableOpacity onPress={ () => navigation.navigate('SignIn')}>
                        <Text style={styles.buttonSignIn}> Registrate</Text> 
                    </TouchableOpacity>                                       
                </View>                
            </View>
        </View>
    </View>    
  )
}
