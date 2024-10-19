import React, { useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAppleWhole, faCashRegister, faBottleWater, faCarrot, faPercent, faUsers, faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import RecordPurchase from './src/Screens/RecordPurchase/RecordPurchase.jsx';
import Products from './src/Screens/Products/Products.jsx';
import Customers from './src/Screens/Customers/Customers.jsx';
import Discounts from './src/Screens/Discounts/Discounts.jsx';
import '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import Combos from './src/Screens/Combos/Combos.jsx';
import FloatingActionButton from './FloatingActionButton.jsx';

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ icon, size, color, isFocused }) => {
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // Trigger the animation only if the tab is focused
      setAnimationKey(prevKey => prevKey + 1);
    }, [isFocused])
  );

  return (
    <Animatable.View
      key={animationKey} // Trigger re-render to restart animation
      animation={isFocused ? 'bounce' : undefined}
      duration={2000} // Duration of the animation in milliseconds
      iterationCount={1} // Run animation only once
    >
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    </Animatable.View>
  );
};

export default function Tabs({ navigation }) {
  return (
    <View style={{flex:1}}>
          <Tab.Navigator
      swipeEnabled={true}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#F1F1F1',
          borderTopWidth: 0,
          height: '10%',
          borderRadius: 100,
          bottom: 10,
          elevation: 15,
          shadowColor: 'black',
          shadowOpacity: 25,
          shadowOffset: { width: 10, height: 23 },
          shadowRadius: 25,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'RecordPurchase') {
            return <AnimatedIcon icon={faCashRegister} size={size * 1.3} color={color} isFocused={focused} />;
          } else if (route.name === 'Products') {
            return <AnimatedIcon icon={faBoxesStacked} size={size * 1.3} color={color} isFocused={focused} />;
          } else if (route.name === 'Customers') {
            return <AnimatedIcon icon={faUsers} size={size * 1.3} color={color} isFocused={focused} />;
          } else if (route.name === 'Discounts') {
            return <AnimatedIcon icon={faPercent} size={size * 1.3} color={color} isFocused={focused} />;
          } else if (route.name === 'Combos') {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AnimatedIcon icon={faCarrot} size={size * 0.8} color={color} isFocused={focused} />
                <AnimatedIcon icon={faAppleWhole} size={size * 0.8} color={color} isFocused={focused} />
                <AnimatedIcon icon={faBottleWater} size={size * 1} color={color} isFocused={focused} />
              </View>
            );
          }
        },
        tabBarActiveTintColor: '#1F8169',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: '',
      })}
    >
      <Tab.Screen
        name="Products"
        options={{ headerShown: false }}
        component={Products}
      />
      <Tab.Screen
        name="Customers"
        options={{ headerShown: false }}
        component={Customers}
      />
      <Tab.Screen
        name="Discounts"
        options={{ headerShown: false }}
        component={Discounts}
      />
      <Tab.Screen
        name="Combos"
        options={{ headerShown: false }}
        component={Combos}
      />
    </Tab.Navigator>
      <FloatingActionButton onPress={() => navigation.navigate("RecordPurchase")} />
    </View>

  );
}
