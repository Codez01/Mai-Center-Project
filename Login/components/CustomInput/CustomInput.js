
// react improt 
import React from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
// importing the Controller so i can use them from hooks 
import {Controller} from 'react-hook-form';

 /* control => for controlling the input and checks it
     name => so i can change whenever i want to 
     rules => for controlling the validation of the input 
     placeholder => is to place the text we want to appear before entering the input 
     secureTextEntry => for hiffing the text    
  */ 
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  image,
  iconSize
}) => {
  return ( 
    // init the variables for using hooks 
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              // if there is in error, show it it a red color , else #e8e8e8 
              {borderColor: error ? 'red' : '#e8e8e8'}, 
            ]}>
            <TextInput
              // init the variables for using them using hooks 
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={{alignSelf: "stretch" , flex:1 }}
              secureTextEntry={secureTextEntry}
              
            />
            <Image source={image} resizeMode="contain" style={{ width: iconSize , position: 'absolute', right: "8%", alignSelf: "center"}} />
            
          </View>
          {error && (
            // making the box as stretch, with a red color when there is an error  
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};


const styles = StyleSheet.create({
  // a very simple style for the input boxes 
  container: {
    flexDirection:"row",
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    padding: 9,
    width: "80%",
    marginTop: 17,
  },
  input: {},
});

export default CustomInput;