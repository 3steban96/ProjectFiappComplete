import React, { useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import Home from './src/Screens/Home/Home.jsx';
import '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import DetailsProfile from './src/Screens/DetailsProfile/DetailsProfile.jsx';
const {width, height} = Dimensions.get("window");


const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ icon, size, color, isFocused }) => {
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setAnimationKey(prevKey => prevKey + 1);
    }, [isFocused])
  );

  return (
    <Animatable.View
      key={animationKey}
      animation={isFocused ? 'bounce' : undefined}
      duration={2000}
      iterationCount={1} 
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
          // height: '10%',
          marginHorizontal:height*0.086,
          borderRadius: 100,
          bottom: 10,
          elevation: 15,
          shadowColor: 'black',
          shadowOpacity: 25,
          shadowOffset: { width: 10, height: 23 },
          shadowRadius: 25,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Home') {
            return <AnimatedIcon icon={faHome} size={size * 1.3} color={color} isFocused={focused} />;
          } else if (route.name === 'DetailsProfile') {
            return <AnimatedIcon icon={faUser} size={size * 0.8} color={color} isFocused={focused} />
          }
        },
        tabBarActiveTintColor: '#1F8169',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: '',
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Tab.Screen
        name="DetailsProfile"
        options={{ headerShown: false }}
        component={DetailsProfile}
      />
    </Tab.Navigator>
    </View>

  );
}
