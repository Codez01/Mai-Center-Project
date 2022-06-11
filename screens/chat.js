//general imports
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { NavigationContainer } from '@react-navigation/native';
//---------------------------

//gradient background import
import {LinearGradient} from 'expo-linear-gradient';
//--------------------------

// import chat
import Chats from '../ChatSection/screens/Chat'

export default function Chat() {
  return (
    <NavigationContainer>
      <Chats Username="Mai Center"/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    main : {
backgroundColor:"#f9c5d1",

flex:10000
  },
 container: {
    flex: 1,
    paddingTop: 40,
    fontSize: 50,
    backgroundColor: '#252250',
  },
});
