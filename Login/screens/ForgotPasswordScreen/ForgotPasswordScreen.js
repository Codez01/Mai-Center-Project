import React, {useState} from 'react'
import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert,
  } from 'react-native'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
//database import
import { db , auth} from "../../../Database/firebase-config";
import { ref, set, onValue } from "firebase/database";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm(); 
  const navigation = useNavigation();

  const onSendPressed = async data => {
sendPasswordResetEmail(auth , String(data.email))
.then(function() {  
  alert("Email Sent Successfully");
})
.catch(function(error) {
  alert(error);

});
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  }; 

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="email"
          control={control}
          placeholder="Enter your email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},

          }}
        />

        <CustomButton text="Send a link" onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
    },
    title:{
        alignContent: 'center',
        fontSize:24,
        fontWeight:'bold',
        color : '#F69794',
        margin: 10,
    },
  
});
export default ForgotPasswordScreen;