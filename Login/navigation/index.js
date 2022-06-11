// react / react native improts 
import React from 'react';
import { View, Text } from 'react-native';
// improt the navigation container   
import { NavigationContainer } from '@react-navigation/native';
// creating the stack for the navigation  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// importing the sign-in/sign-up/forget password / home screen pages  
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import NavigationBar from '../../navigationBar';
import Chat from "../../screens/chat";
// create the stack for navigation 
const Stack = createNativeStackNavigator();
// the function of the navigation and putting all the pages that will navigate to 
const Navigation = () => {
  return (
  <>
       {/** dont show the header*/} 
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {/** the screens we navigate to with there names and the component value  */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NavBar" component={NavigationBar} />
        <Stack.Screen name="Chats" component={Chat} />


      </Stack.Navigator >
        </>
  );
};
// export 
export default Navigation;
