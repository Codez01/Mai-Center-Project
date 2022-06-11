import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Navigation from './navigation';

const Login = () => { 
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>  
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',

  },
});

export default Login;
