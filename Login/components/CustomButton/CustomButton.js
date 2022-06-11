// import for using the react native tools  
import React from 'react'
// import for making text, the sheet style and pressable so we could press the button  
import {Text,StyleSheet,Pressable} from 'react-native'
// a constructor for the botton and its instructure
const CustomButton = ({onPress,text}) =>{
return(
  // the status of the button is on-press and the text style  
    <Pressable onPress={onPress} 
        style={styles.container}> 
       <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

//the style part 
const styles = StyleSheet.create({ 
  // container styles 
  container:{
    // the color of the button container 
    backgroundColor: '#F69794',
    // the width of the button container
    width: '80%',
    // the padding of the button container
    padding: 15,
    // the spaces betwwen the button 
    marginVertical: 5,
    // putting the wordas in the center of the buttons 
    alignItems: 'center',
    // the circle shape of the buttons 
    borderRadius:25,
  },
  // text styles 
  text:{
    // text is bold 
    fontWeight:'bold',
    // the color of the text of the button 
    color: 'white',
  },

}); 
export default CustomButton