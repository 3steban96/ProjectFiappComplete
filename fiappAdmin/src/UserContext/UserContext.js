import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [store, setStore] = useState(null);
  const [nameStore, setNameStore] = useState(null); // Añadido para capturar el nombre del usuario

  useEffect(() => {
    // Función para cargar el estado almacenado cuando la app inicia
    const loadStoreFromStorage = async () => {
      try {
        const savedStore = await AsyncStorage.getItem('store');
        const savedUserName = await AsyncStorage.getItem('nameStore'); // Cargar el nombre del usuario
        if (savedStore) {
          setStore(JSON.parse(savedStore));
        }
        if (savedUserName) {
          setNameStore(savedUserName); // Establecer el nombre del usuario
        }
      } catch (e) {
        console.error('Error loading data from storage', e);
      }
    };

    loadStoreFromStorage();
  }, []);

  // Función para guardar el estado en AsyncStorage cuando cambie
  useEffect(() => {
    const saveStoreToStorage = async () => {
      try {
        if (store) {
          await AsyncStorage.setItem('store', JSON.stringify(store));
        }
        if (nameStore) {
          await AsyncStorage.setItem('nameStore', nameStore); // Guardar el nombre del usuario
        }
      } catch (e) {
        console.error('Error saving data to storage', e);
      }
    };

    saveStoreToStorage();
  }, [store, nameStore]);

  return (
    <UserContext.Provider value={{ store, setStore, nameStore, setNameStore }}>
      {children}
    </UserContext.Provider>
  );
};
