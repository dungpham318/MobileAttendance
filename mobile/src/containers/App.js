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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';


// import DrawerContentContainer from './home/DrawerContentContainer';

// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

// const Drawer = createDrawerNavigator();

import LoginContainer from './account/LoginContainer'
import CheckDevice from '../components/device/CheckDevice'
import Calendar from '../components/calendar/Calendar'
import Other from '../components/Other/Other'
import Home from '../components/home/Home'
import Checkin from '../components/home/Checkin'
import font from '../res/font';
import size from '../res/size';


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
        <Stack.Screen name="CheckDevice" component={CheckDevice} />
        <Stack.Screen name="Home" component={TabScreen} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Other" component={Other} />
        <Stack.Screen name="Checkin" component={Checkin} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      keyboardHidesTabBar={true}

      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, colors, sizes }) => {
          let label = ''
          if (route.name === 'Home') {
            label = 'Home'
          } else if (route.name === 'Calendar') {
            label = 'Calendar'
          } else if (route.name === 'Other') {
            label = 'Other'
          }

          return <Text style={{
            fontFamily: focused ? font.bold : font.regular,
            color: focused ? '#FE9E23' : '#BFBFBF',
            fontSize: size.s25
          }}>{label}</Text>
        },
        tabBarIcon: ({ focused, colors, sizes }) => {
          let iconName = ''
          if (route.name === 'Home') {
            iconName = require('../res/image/ic_home.png')
          } else if (route.name === 'Calendar') {
            iconName = require('../res/image/ic_calendar.png')
          } else if (route.name === 'Other') {
            iconName = require('../res/image/ic_other.png')
          }
          return <Image
            resizeMode='contain'
            source={iconName}
            style={{
              width: size.s40,
              height: size.s40,
              tintColor: focused ? '#FE9E23' : '#BFBFBF',
            }}
          />
        }
      })}
      // tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        // keyboardHidesTabBar: true,
        // activeTintColor: color.baseColor,
        // inactiveTintColor: 'gray',
        // lazyLoad: true,
        // labelStyle: {
        //   fontSize: size.s20,
        //   fontFamily: 'UTMAvoBold'
        // },
        // style: {
        //   borderTopLeftRadius: size.s30,
        //   borderTopRightRadius: size.s30,
        //   borderWidth: 0.5,
        //   borderColor: color.line,
        //   backgroundColor: 'rgba(250, 250, 250, 0.5)',
        // },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Other" component={Other} />
    </Tab.Navigator>
  );
};

export default MainStackScreen;
