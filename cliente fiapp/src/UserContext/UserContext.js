import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null); // Añadido para capturar el correo
  const [phone, setPhone] = useState(null); // Añadido para capturar el teléfono
  const [idNumber, setIdNumber] = useState(null); // Añadido para capturar el teléfono
  const [globalCreditLimit, setGlobalCreditLimit] = useState(null); // Añadido para capturar el teléfono

  useEffect(() => {
    // Función para cargar el estado almacenado cuando la app inicia
    const loadCustomerFromStorage = async () => {
      try {
        const savedCustomer = await AsyncStorage.getItem('customer');
        const savedFullName = await AsyncStorage.getItem('fullName');
        const savedEmail = await AsyncStorage.getItem('email'); // Cargar el correo
        const savedPhone = await AsyncStorage.getItem('phone'); // Cargar el teléfono
        const idNumber = await AsyncStorage.getItem('idNumber'); // Cargar el teléfono
        const globalCreditLimit = await AsyncStorage.getItem('globalCreditLimit'); // Cargar el teléfono
        
        if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
        if (savedFullName) setFullName(savedFullName);
        if (savedEmail) setEmail(savedEmail); // Establecer el correo
        if (savedPhone) setPhone(savedPhone); // Establecer el teléfono
        if (idNumber) setIdNumber(idNumber); // Establecer el teléfono
        if (globalCreditLimit) setGlobalCreditLimit(globalCreditLimit); // Establecer el teléfono
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
        if (customer) await AsyncStorage.setItem('customer', JSON.stringify(customer));
        if (fullName) await AsyncStorage.setItem('fullName', fullName);
        if (email) await AsyncStorage.setItem('email', email); // Guardar el correo
        if (phone) await AsyncStorage.setItem('phone', phone); // Guardar el teléfono
        if (idNumber) await AsyncStorage.setItem('idNumber', idNumber); // Guardar el teléfono
        if (globalCreditLimit) await AsyncStorage.setItem('globalCreditLimit', globalCreditLimit); // Guardar el teléfono
        // console.log("fullname",fullName)
        // console.log("email",email)
        // console.log("phone",phone)
        // console.log("idNumber",idNumber)
        // console.log("globalCredit",globalCreditLimit)
      } catch (e) {
        console.error('Error saving data to storage', e);
      }
    };

    saveCustomerToStorage();
  }, [customer, fullName, email, phone, idNumber, globalCreditLimit]);

  return (
    <UserContext.Provider value={{ customer, setCustomer, fullName, setFullName, email, setEmail, phone, setPhone, idNumber, setIdNumber, globalCreditLimit, setGlobalCreditLimit }}>
      {children}
    </UserContext.Provider>
  );
};
