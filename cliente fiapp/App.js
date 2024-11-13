import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/UserContext/UserContext';  
import Login from './src/Screens/Login/Login';
import SignUp from './src/Screens/SignUp/SignUp';
import Tabs from './Tabs';
import Home from './src/Screens/Home/Home';
import ProductsCategorySelected from './src/Screens/ProductsCategorySelected/ProductsCategorySelected';
import StoreSelected from './src/Screens/StoreSelected/StoreSelected.jsx';
import ResetPassword from './src/Screens/ResetPassword/ResetPassword.jsx';
import ForgotPassword from './src/Screens/ForgotPassword/ForgotPassword.jsx';
import CodeVerification from './src/Screens/CodeVerification/CodeVerification.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
        <Stack.Screen name="CodeVerification" options={{ headerShown: false }} component={CodeVerification} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} component={ResetPassword} />
          <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="ProductsCategorySelected" options={{ headerShown: false }} component={ProductsCategorySelected} />
          <Stack.Screen name="StoreSelected" options={{ headerShown: false }} component={StoreSelected} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
