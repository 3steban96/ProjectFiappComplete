import React from 'react'
import {View,Text, StatusBar, Image, TouchableOpacity} from 'react-native'
import styles from './screen1Style'
export default function Screen1({navigation}) {
  return (
    <View style={styles.container}>
        <StatusBar/>
        <View style={styles.containerImg}>
            <Text>Logo</Text>
            <Image/>
        </View>
        <View style={styles.containerButtons}>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('SignIn')}>
                    <Text>Registarse</Text>
                </TouchableOpacity>
            </View>
        </View>      
    </View>
  )
}
