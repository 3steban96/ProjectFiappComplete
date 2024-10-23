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

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="ProductsCategorySelected" options={{ headerShown: false }} component={ProductsCategorySelected} />
          <Stack.Screen name="StoreSelected" options={{ headerShown: false }} component={StoreSelected} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
