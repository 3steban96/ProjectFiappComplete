import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={onPress}
    >
      <FontAwesomeIcon icon={faCashRegister} size={24} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: '12%',
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#1F8169',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default FloatingActionButton;
