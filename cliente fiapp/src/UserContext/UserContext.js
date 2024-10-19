import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [fullName, setFullName] = useState(null); // Añadido para capturar el nombre del usuario

  useEffect(() => {
    // Función para cargar el estado almacenado cuando la app inicia
    const loadCustomerFromStorage = async () => {
      try {
        const savedCustomer = await AsyncStorage.getItem('customer');
        const savedUserName = await AsyncStorage.getItem('fullName'); // Cargar el nombre del usuario
        if (savedCustomer) {
          setCustomer(JSON.parse(savedCustomer));
        }
        if (savedUserName) {
          setFullName(savedUserName); // Establecer el nombre del usuario
        }
      } catch (e) {
        console.error('Error loading data from storage', e);
      }
    };

    loadCustomerFromStorage();
  }, []);

  // Función para guardar el estado en AsyncStorage cuando cambie
  useEffect(() => {
    const saveCustomerToStorage = async () => {
      try {
        if (customer) {
          await AsyncStorage.setItem('customer', JSON.stringify(customer));
        }
        if (fullName) {
          await AsyncStorage.setItem('fullName', fullName); // Guardar el nombre del usuario
        }
      } catch (e) {
        console.error('Error saving data to storage', e);
      }
    };

    saveCustomerToStorage();
  }, [customer, fullName]);

  return (
    <UserContext.Provider value={{ customer, setCustomer, fullName, setFullName }}>
      {children}
    </UserContext.Provider>
  );
};
