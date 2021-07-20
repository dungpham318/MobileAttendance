import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

// import DrawerContentContainer from './home/DrawerContentContainer';

// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

// const Drawer = createDrawerNavigator();

import LoginContainer from './account/LoginContainer'


const MainStackScreen = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar
        // barStyle={color.statusBar}
        backgroundColor='transparent'
        translucent
      /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}

        initialRouteName={'Login'}
      >
        <Stack.Screen name="Login" component={LoginContainer} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackScreen;
