import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, } from 'react-native-paper';
import styles from './forgotPasswordStyle';
export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail]= useState('');

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post('http://192.168.0.9:3000/store/recoveryPassword', {
        email
      });
  
      if (response.status === 200) {
        alert('Email enviado correctamente');
        navigation.navigate("CodeVerification");
      }
    } catch (error) {
      console.log("Error al enviar el email:", error);
      alert('Hubo un problema al enviar el email. Intenta de nuevo.');
    }
  };
  return (
    <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>      
      <View style={{flexDirection:'row',backgroundColor:'#1f8169',height:'100%',borderTopRightRadius:100,borderTopLeftRadius:100,bottom:0,marginTop:400}}>
      </View>
      <View style={styles.logoContainer}>
        <Image 
            style={styles.logo} 
            source={require('../../../assets/IconScreenLoginFiapp.png')} 
            resizeMode="contain" // Esto mantiene la proporción original de la imagen
        />
      </View>

      <Card style={{position:'absolute',margin:30,padding:25,backgroundColor:'white'}}>
        <Card.Title title="¿Haz olvidado tu contraseña?" titleStyle={{fontWeight:'bold', fontSize:20, textAlign:'center'}} titleNumberOfLines={2}/>
        <Card.Content>
          <Text  style={{textAlign:'center',color:'gray'}}>Por favor ingresa tu email para enviar el codigo de verificación</Text>
        </Card.Content>
        <Card.Actions style={{width:'100%'}}>
          <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={{ width:'100%',borderColor: 'gray', borderWidth: 1, padding:10,borderRadius:100}}
          placeholder="Correo electrónico"
          />
        </Card.Actions>
        <Card.Actions style={{width:'100%'}}>
          <TouchableOpacity onPress={handleEmailVerification} style={{width:'100%', backgroundColor:'#1F8169',borderRadius:100}}>
            <Text style={{color:'white',textAlign:'center',padding:10}}>
              Enviar código de verificación
            </Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </View>
  )
}
