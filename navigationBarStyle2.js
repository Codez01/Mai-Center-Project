// ------------- General Imports -----------------------------
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { NavigationContainer } from '@react-navigation/native';
// ------------- General Imports -----------------------------

//---------------------- screens Imports ----------------------
import  Home from "./screens/home"
import  Events  from "./screens/events"
import   Chat  from "./screens/chat"
import  Rights   from "./screens/rights"
import  Coupons  from "./screens/coupons"
import  AboutUs  from "./screens/about-us"
//---------------------- screens Imports ----------------------



//---------------------- Icons Imports ----------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
//---------------------- Icons Imports ----------------------



const Tabs = AnimatedTabBarNavigator();//get the animated tab bar navigator


//navigation component
const NavigationBar = () => {
    return (

  <Tabs.Navigator

  tabBarOptions={{//=============== Tab bar options ================= */

          activeTintColor: "#ffffff",
          inactiveTintColor: "#2aa7c7",
          activeBackgroundColor: "#2aa7c7",
          
    }}
    
appearance={{//=============== Tab bar appearance options ================= */

      floating: true,
      shadow:true,
      dotSize: "large",
      horizontalPadding:20,
      


    }}>

    <Tabs.Screen name="Home" component={Home} options={{    //=============== render screens ================= */

      showIcon: true ,
      tabBarIcon: ({focused}) => {
         return(
           //if focused
           focused ? <FontAwesomeIcon icon={Icons.faHome} color="white"/> :
           //else
           <FontAwesomeIcon icon={Icons.faHome} color="#2aa7c7"/> ); 
         
         }

    }} />
    <Tabs.Screen name="Events" component={Events} options={{
      showIcon: true ,
      tabBarIcon: ({focused}) => {
         return( focused  ? <FontAwesomeIcon icon={Icons.faCalendar} color="white"/> : 
         <FontAwesomeIcon icon={Icons.faCalendar} color="#2aa7c7"/> ); 
         }

    }} />

    <Tabs.Screen name="Rights" component={Rights}  options={{
      showIcon: true ,
      tabBarIcon: ({focused}) => { return(
        focused ?  <FontAwesomeIcon icon={Icons.faScaleBalanced} color="white"/> :
         <FontAwesomeIcon icon={Icons.faScaleBalanced} color="#2aa7c7"/> ); }

    }} />

    <Tabs.Screen name="Coupons" component={Coupons} options={{
      showIcon: true ,
      tabBarIcon: ({focused}) => { return(
         focused ? <FontAwesomeIcon icon={Icons.faTicket} color="white"/> : 
      <FontAwesomeIcon icon={Icons.faTicket} color="#2aa7c7"/>); }

    }} />

    <Tabs.Screen name="About us" component={AboutUs} options={{
      showIcon: true ,
      tabBarIcon: ({focused}) => { return( focused ? <FontAwesomeIcon icon={Icons.faPeopleGroup} color="white"/> :
      <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#2aa7c7"/>
      ); }

    }} />
    
    </Tabs.Navigator>
    );
}
//navigation component

//*********************** STYLES *********************************** */
const styles = StyleSheet.create({
  
});
//*********************** STYLES *********************************** */

//------------------------- EXPORTS --------------------------------
export default NavigationBar;


