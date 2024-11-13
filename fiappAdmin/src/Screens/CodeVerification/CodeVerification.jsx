import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import styles from './codeVerificationStyle';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export default function CodeVerification({newPassword}) {
  const [code, setCode] = useState(new Array(6).fill('')); // Inicializamos un array de 6 elementos vacíos.
  const inputs = useRef([]); // Referencia para acceder a cada TextInput.
  const navigation = useNavigation();
  const handleChangeText = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Mueve el foco al siguiente campo si hay un valor y no es el último índice
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };
  const handleVerifyCode = () => {
    const recoveryCode = code.join(''); // Une el array en un solo string
  
    if (!recoveryCode) {
      alert('Por favor ingresa el código de verificación');
      return;
    }
  
    // Navega directamente a ResetPassword con el código de verificación
    navigation.navigate('ResetPassword', { recoveryCode });
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', backgroundColor: '#1f8169', height: '100%', borderTopRightRadius: 100, borderTopLeftRadius: 100, bottom: 0, marginTop: 600 }}>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/IconScreenLoginFiapp.png')}
          resizeMode="contain"
        />
      </View>
      <Card style={{ position: 'absolute', margin: 30, padding: 40, backgroundColor: 'white' }}>
        <Card.Title title="Ingresa el código enviado al email ingresado" titleStyle={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }} titleNumberOfLines={2} />
        
        <Card.Actions style={{ width: '100%', justifyContent: 'center', marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputs.current[index] = ref} // Asigna cada input a la referencia correspondiente
                value={digit}
                onChangeText={text => handleChangeText(text, index)}
                keyboardType="number-pad"
                maxLength={1} // Solo permite un dígito
                style={{
                  borderColor: '#1F8169',
                  borderWidth: 1,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  width: 40,
                  height: 50,
                }}
              />
            ))}
          </View>
        </Card.Actions>
        
        <Card.Actions style={{ width: '100%' }}>
          <TouchableOpacity onPress={handleVerifyCode} style={{ width: '100%', backgroundColor: '#1F8169', borderRadius: 100 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>
              Verificar código
            </Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </View>
  );
}
