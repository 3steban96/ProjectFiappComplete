import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors, Button } from 'react-native-paper';

export default function NotAssociatedStore({ onExploreStores }) {
  return (
    <View style={styles.container}>
      <Icon source="store" size={80} color={"#1F8169"} />
      <Text style={styles.title}>No estás asociado a ninguna tienda</Text>
      <Text style={styles.subtitle}>Actualmente, no estás asociado a ninguna tienda. Para disfrutar de promociones personalizadas, asóciate a tus tiendas mas cercanas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: "black",
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: MD3Colors.neutral60,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: MD3Colors.primary40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
