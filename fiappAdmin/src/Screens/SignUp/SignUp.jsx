import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from './signUpStyle';
export default function SignIn() {
  const [nameStore, setNameStore] = useState('');
  const [nit, setNit] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress]=useState('');
  const [city, setCity]=useState('');
  const [phone, setPhone]=useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorNumber, setHasErrorNumber] = useState(false);

  const navigation = useNavigation();

  // const validateName = (text) => {
  //   const isValid = /^[a-zA-Z\s]+$/.test(text);
  //   setHasErrorName(!isValid); 
  //   setNameStore(text);
  // };

  // const validateIdNumber = (text) => {
  //   const isValid = /^[0-9]+$/.test(text);
  //   setHasErrorNumber(!isValid); // Actualiza el estado del error
  //   setNit(text);
  // };
  const validateNumber = (text) => {
    const isValid = /^[0-9]+$/.test(text);
    setHasErrorNumber(!isValid); // Actualiza el estado del error
    setNit(text);
  };
   
  const handleSuccessSignUp = () => {
      navigation.navigate('Login')
    };
  
  const handleSubmit = async () => {
    if (!nameStore || !nit || !email || !address || !city || !phone|| !password || !confirmPassword) {
      console.log("Datos",nameStore,nit,email,phone,password,confirmPassword)
      alert('Por favor, complete todos los campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    
    const data = {
      nameStore: nameStore,
      nit: parseInt(nit, 10),
      email: email,
      address: address,
      city: city,      
      phone:  parseInt(phone, 10),
      password: password,
    };
    console.log("Datos enviados:",data)
    try {
      const response = await axios.post('http://192.168.0.9:3000/store/regiter', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Cliente registrado exitosamente');
      handleSuccessSignUp();
      setNameStore('');
      setNit('');
      setEmail('');
      setAddress('');
      setCity('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');    

    } catch (error) {
      console.error(error);
      alert('Error al registrar el cliente');
    }
  };


  return (    
    <View style={styles.container}>
      <StatusBar/>      
      <View style={styles.rowTitle}>
        <Text style={styles.txtTitle}>Crea</Text>
        <Text style={styles.txtTitle2}>Tu Cuenta</Text>
      </View>      
      <ScrollView style={{flex:2, height: 'auto',backgroundColor:'white',borderTopLeftRadius:40,borderTopRightRadius:40,paddingTop:10 }}>          
        <View style={{borderTopLeftRadius:40,borderTopRightRadius:40}}>

        
        <View style={styles.inputContainer}>
          <TextInput            
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Nombre de la tienda'
            value={nameStore}
            onChangeText={setNameStore}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Nit' 
            keyboardType='numeric' 
            value={nit}
            onChangeText={validateNumber}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Dirección'
            value={address}
            onChangeText={setAddress}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Ciudad / Municipio'
            value={city}
            onChangeText={setCity}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Telefono'keyboardType='numeric'
            value={phone}
            onChangeText={setPhone}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Contraseña'            
            right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"}onPress={()=>setShowPassword(!showPassword)} />}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            label='Confirmar contraseña'            
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
        </View>
        <Button mode="elevated" buttonColor="#1F8169" style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Button>
        </View>
      </ScrollView>
    </View>
   
  )
}
