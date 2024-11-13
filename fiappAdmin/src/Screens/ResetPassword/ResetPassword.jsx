import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import styles from './resetPasswordStyle';
export default function ResetPassword({route}) {
  const { recoveryCode } = route.params; // Recibe el código de verificación desde CodeVerification
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Codigo ingresado",recoveryCode)
    console.log("Codigo ingresado",newPassword)
    try {
      // Envía recoveryCode y newPassword en una sola solicitud al backend
      const response = await axios.post("http://192.168.0.9:3000/store/resetPassword", {
        recoveryCode,
        newPassword
      });
      console.log("respuesta del servidor",response)
      if (response.status === 200) {
        alert('Contraseña restablecida con éxito');
        navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
      }
    } catch (error) {
        console.log("Error en la solicitud:", error);  // Imprimir el error detallado
        alert('Error al restablecer la contraseña');    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
    <View style={{ flexDirection: 'row', backgroundColor: '#1f8169', height: '100%', borderTopRightRadius: 100, borderTopLeftRadius: 100, bottom: 0, marginTop: 600 }}>
    </View>
      {/* Fondo inferior con estilo mejorado */}
      <View style={styles.backgroundShape} />

      {/* Logo en la parte superior */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/IconScreenLoginFiapp.png')}
          resizeMode="contain"
        />
      </View>

      {/* Card principal */}
      <Card style={styles.card}>
        <Card.Title
          title="Ingresa una nueva contraseña"
          titleStyle={styles.cardTitle}
          titleNumberOfLines={2}
        />

        {/* Campos de entrada de contraseña */}
        <View style={styles.containerRowInputs}>
          <TextInput
            style={styles.input}
            label="Nueva Contraseña"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            cursorColor="#1F8169"
            activeUnderlineColor='#1f8169'
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </View>
        <View style={styles.containerRowInputs}>
          <TextInput
            style={styles.input}
            label="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            cursorColor="#1F8169"
            activeUnderlineColor='#1f8169'
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </View>

        {/* Botón de continuar */}
        <Card.Actions style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleResetPassword}
            style={styles.continueButton}
          >
            <Text style={styles.buttonText}>
              Continuar
            </Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </View>
  );
}
