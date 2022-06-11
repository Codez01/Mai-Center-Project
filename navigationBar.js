// ------------- General Imports -----------------------------
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// ------------- General Imports -----------------------------

//---------------------- Icons Imports ----------------------
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
//---------------------- Icons Imports ----------------------

//---------------------- screens Imports ----------------------
import Home from "./screens/home";
import EventApp from "./Events/EventApp";
import Chat from "./ChatSection/screens/Chat";
import Rights from "./screens/rights";
import RightCategory from "./Rights/rightCategory";
import Coupons from "./screens/coupons";
import AboutUs from "./screens/about-us";
//---------------------- screens Imports ----------------------
//---------------------- Import colours -----------------------
import Colours from "./assets/Colours/Colours";
//---------------------- Import colours -----------------------

//---------------------- Events Details screens Imports ----------------------
import TrendingEventsDetailsScreen from "./Events/TrendingEventsDetailsScreen";

//---------------------- Events Details screens Imports ----------------------


//--------------------------- import login --------------------------------
import Login from "./Login/Login";
//--------------------------- import login --------------------------------

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  // Animated Tab Indicator...

  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      backBehavior={"Home"}
      screenOptions={{
        tabBarShowLabel: false, //hide the labels ,
        tabBarStyle: {
          //style
          position: "absolute", //absolute for the navigation to always be on top of the current page
          marginBottom: 20, //for a floating effecr
          borderRadius: 30, //for a rounded notification bar
          paddingTop: Platform.OS == "android" ? 1 : 10,
          marginLeft: 15,
          marginRight: 15,
        },
      }}
    >
      {
        <Tab.Screen
          name="TrendingEventDetails"
          component={TrendingEventsDetailsScreen}
          options={() => ({
            headerTransparent: "true",
            headerTitle: "",
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
      }
      {
        <Tab.Screen
          name="Login"
          component={Login}
          options={() => ({
            headerTransparent: "true",
            headerTitle: "",
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
      }
      {
        <Tab.Screen
          name="RightCategory"
          component={RightCategory}
          options={() => ({
            headerTransparent: "true",
            headerTitle: "",
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
      }

      {
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={() => ({
            headerTransparent: "true",
            headerTitle: "",
            tabBarStyle: {display: "none",},
            tabBarButton: () => null,
          })}
        />
      }

      <Tab.Screen
        name={"Events"}
        component={EventApp}
        options={{
          headerTransparent: "true",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 10,
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faCalendar}
                size={25}
                color={focused ? Colours.blue : Colours.grey}
              />
            </View>
          ),
          headerTitle: "",
        }}
      ></Tab.Screen>

      {}

      <Tab.Screen
        name={"Rights"}
        component={Rights}
        options={{
          headerTransparent: "true",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 10,
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faScaleBalanced}
                size={25}
                color={focused ? Colours.blue : Colours.grey}
              />
            </View>
          ),

          headerTitle: "",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          headerTransparent: "true",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: focused ? Colours.blue : Colours.grey,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: Platform.OS == "android" ? 50 : 40,
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faHome}
                size={35}
                color={focused ? "white" : "white"}
              />
            </View>
          ),
          headerTitle: "",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"Coupons"}
        component={Coupons}
        options={{
          headerTransparent: "true",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 10,
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faTicket}
                size={25}
                color={focused ? Colours.blue : Colours.grey}
              />
            </View>
          ),
          headerTitle: "",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"About Us"}
        component={AboutUs}
        options={{
          headerTransparent: "true",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 10,
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faPeopleGroup}
                size={25}
                color={focused ? Colours.blue : Colours.grey}
              />
            </View>
          ),
          headerTitle: "",
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

function Headertitle(props) {
  //header title design
  return (
    <View
      style={{
        width: 80,
        height: 30,
        backgroundColor: Colours.babyPink,
        borderColor: "white",
        borderWidth: 1,
        opacity: 0.8,
        borderRadius: 15,
        marginRight: Platform.OS == "android" ? 0 : 300,
      }}
    >
      <Text
        style={{
          color: "white",
          alignContent: "center",
          alignSelf: "center",
          padding: 4,
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text>
    </View>
  );
}

//----------------- STYLESHEET ---------------------
const styles = StyleSheet.create({});
//----------------- STYLESHEET ---------------------

//------------------------- EXPORTS --------------------------------
export default NavigationBar;
//------------------------- EXPORTS --------------------------------
