//general imports
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { NavigationContainer } from "@react-navigation/native";
import NavigationBar from "./navigationBar";

//---------------------------

//--------------------------- import login --------------------------------
import Login from "./Login/Login";
//--------------------------- import login --------------------------------

//---------------------- import Events ----------------------------
import EventApp from "./Events/EventApp";
//---------------------- import Events ----------------------------


//---------------------- import Chat ----------------------------
import Chat from './ChatSection/screens/Chat'

const Tabs = AnimatedTabBarNavigator(); //get animated tab bar navigator

const App = ({username}) => {
  //app component
  return (
    <>
      <>
        <NavigationContainer>
          <Login />
          </NavigationContainer>
      </>
    </>
  );
};

//****************** STYLESHEET ******************** */
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f9c5d1",

    flex: 10000,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
//****************** STYLESHEET ******************** */

//-------------------------- export --------------------------
export default App;
//-------------------------- export --------------------------
