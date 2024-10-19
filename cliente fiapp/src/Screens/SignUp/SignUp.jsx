import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import styles from './signUpStyle';

export default function SignUp() {

  const [fullNameC, setFullNameC] = useState('');
  const [typeDocumentC, setTypeDocumentC] = useState('');
  const [idNumberC, setIdNumberC] = useState('');
  const [emailC, setEmailC] = useState('');
  const [phoneC, setPhoneC] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [confirmPasswordC, setConfirmPasswordC] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorNumber, setHasErrorNumber] = useState(false);
  const navigation = useNavigation();

  const validateName = (text) => {
    const isValid = /^[a-zA-Z\s]+$/.test(text);
    setHasErrorName(!isValid); 
    setFullNameC(text);
  };

  const validateIdNumber = (text) => {
    const isValid = /^[0-9]+$/.test(text);
    setHasErrorNumber(!isValid); // Actualiza el estado del error
    setIdNumberC(text);
  };
   
  const handleSuccessSignUp = () => {
      navigation.navigate('Login')
    };
  
  const handleSubmit = async () => {
    if (!fullNameC || !typeDocumentC || !idNumberC || !emailC || !phoneC || !passwordC || !confirmPasswordC) {
      console.log("Datos",fullNameC,typeDocumentC,idNumberC,emailC,phoneC,passwordC,confirmPasswordC)
      alert('Por favor, complete todos los campos.');
      return;
    }
    
    if (passwordC !== confirmPasswordC) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    
    const data = {
      fullNameC: fullNameC,
      typeDocumentC: typeDocumentC,
      idNumberC: parseInt(idNumberC, 10),
      emailC: emailC,
      phoneC:  parseInt(phoneC, 10),
      passwordC: passwordC,
    };
    console.log("Datos enviados:",data)
    try {
      const response = await axios.post('http://192.168.0.5:3000/customer/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Cliente registrado exitosamente');
      handleSuccessSignUp();
      setFullNameC('');
      setTypeDocumentC('');
      setIdNumberC('');
      setEmailC('');
      setPhoneC('');
      setPasswordC('');
      setConfirmPasswordC('');
    } catch (error) {
      console.error(error);
      alert('Error al registrar el cliente');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.rowTitle}>
        <Text style={styles.txtTitle}>Crea</Text>
        <Text style={styles.txtTitle2}>Tu Cuenta</Text>
      </View>
      <ScrollView style={{flex:2, height: 'auto',backgroundColor:'white',borderTopLeftRadius:40,borderTopRightRadius:40,paddingTop:10 }}>
        <View style={{paddingTop:10}}>
        <View style={styles.inputContainer}>
          <TextInput
            label='Nombres y Apellidos'
            value={fullNameC}
            onChangeText={validateName}
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            error={hasErrorName}
          />
        </View>
        <View style={styles.containerR}>
          <TextInput
            style={styles.textInputR}
            label='Número de identificación'
            keyboardType='numeric'
            maxLength={10}
            value={idNumberC}
            onChangeText={validateIdNumber}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            error={hasErrorNumber}
            />
          <View style={styles.pickerContainerR}>
            <Picker selectedValue={typeDocumentC} onValueChange={(itemValue) => setTypeDocumentC(itemValue)} style={styles.pickerR}>
              <Picker.Item label="CC" value="CC" />
              <Picker.Item label="PS" value="PS" />
            </Picker>
          </View>
        </View>
        <HelperText type="error" visible={hasErrorNumber} style={{marginHorizontal:20}}>
          Sin espacios, sin comas ni puntos.
        </HelperText>
        <View style={styles.inputContainer}>
          <TextInput
            label='Correo electronico'
            value={emailC}
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
            onChangeText={setEmailC}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label='Numero de celular'
            keyboardType='numeric'
            maxLength={10}
            value={phoneC}
            onChangeText={setPhoneC}
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              label="Contraseña"
              secureTextEntry={!showPassword}
              right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"}onPress={()=>setShowPassword(!showPassword)} />}
              value={passwordC}
              onChangeText={setPasswordC}
              style={{backgroundColor:'#f1f1f1'}}
              cursorColor="#1F8169"
              activeUnderlineColor="#1F8169"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label='Confirmar contraseña'
            // right={<TextInput.Icon icon="eye" />}
            secureTextEntry={!showPassword}
            value={confirmPasswordC}
            onChangeText={setConfirmPasswordC}
            style={{backgroundColor:'#f1f1f1'}}
            cursorColor="#1F8169"
            activeUnderlineColor="#1F8169"
          />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center',marginBottom:30}}>
          <Button mode="elevated" buttonColor="#1F8169" style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar</Text>
          </Button >
        </View>
        </View>
      </ScrollView>
    </View>
  );
}
