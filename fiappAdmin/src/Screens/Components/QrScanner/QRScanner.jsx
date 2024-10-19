import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './qrScannerStyle.js';
import { StyleSheet } from "react-native";

export default function QRScannerScreen({ route }) {
  const navigation = useNavigation();
  const { onScanSuccess } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false); 

  const handleQRCodeRead = (e) => {
    if (!scanned) { 
      setScanned(true);
      const scannedData = e.data;
      const decodedData = scannedData;
      onScanSuccess(decodedData); 
      navigation.goBack(); 
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleQRCodeRead}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Recuadro de escaneo */}
      <View style={styles.overlayContainer}>
        <View style={styles.overlay} />
        <View style={styles.scannerArea}>
          {/* Este es el área donde se verá el recuadro */}
        </View>
        <View style={styles.overlay} />
      </View>

      <Text style={styles.text}>Escanea el código QR del cliente</Text>
    </View>
  );
}
