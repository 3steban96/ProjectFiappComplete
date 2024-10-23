import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext';
import styles from './loginStyle';

export default function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setCustomer, setFullName } = useContext(UserContext);
    const navigation = useNavigation(); 

    const handlePressLogin = async () => {
        if (!email || !password) {
            Alert.alert('Por favor, ingrese correo electrónico y contraseña');
            return;
        }
        try {
            // Enviar solicitud de login al backend
            const response = await axios.post('http://192.168.0.6:3000/customer/login', {
                email,
                password
            });
            // Manejar la respuesta
            const { token, customer } = response.data;
            // Almacenar el token (puedes usar AsyncStorage o cualquier otra solución para el almacenamiento seguro)
            // console.log('Usuario recibido:', customer);

            // console.log('Token recibido:', token);
            setCustomer(customer)
            setFullName(customer.fullName); // Asegúrate de usar el nombre correcto aquí
            // Almacenar el token y el nombre del usuario en AsyncStorage
            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('fullName', customer.fullName); 
            await AsyncStorage.setItem('idNumber', String(customer.idNumber)); 
            await AsyncStorage.setItem('email', customer.email); 
            await AsyncStorage.setItem('phone', String(customer.phone)); 
            await AsyncStorage.setItem('globalCreditLimit', String(customer.globalCreditLimit)); 
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
        <View style={styles.rowTitleLogin}>
            <Text style={styles.titleLogin}>Iniciar sesión</Text>
        </View>
        <View style={styles.containerInputs}>
            <View style={styles.containerRowInputs}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={{width:'100%',backgroundColor:'white',borderRadius:20}}
                        label='Correo electronico'
                        keyboardType='email-address'
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
                    <TouchableOpacity onPress={handlePressLogin} >
                        <Text>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerRowButtoSignIn}>
                    <View style={styles.containerTextButtonSI}>                    
                        <Text >¿No tienes una cuenta? </Text>                    
                    </View>                
                    <View style={styles.containerTextButtonSI}>
                        <TouchableOpacity onPress={ () => navigation.navigate('SignUp')}>
                            <Text style={styles.buttonSignIn}> Registrate</Text> 
                        </TouchableOpacity>                                       
                    </View>                
                </View>
            </View>
        </View>
    </View>    
  )
}
