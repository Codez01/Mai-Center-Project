//general imports
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  SafeAreaProvider,
} from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { NavigationContainer } from "@react-navigation/native";
//---------------------------

//gradient background import
import { LinearGradient } from "expo-linear-gradient";
//--------------------------

//import Lottie Animation
import LottieView from "lottie-react-native";
import Animation1 from "../assets/aboutUsAnim.json";
import ChatAnim from "../assets/chatAnimation.json";

export default function AboutUs() {
  return (
    <View style={styles.main}>
      <LinearGradient // linear gradient background
        colors={["#eda4e7", "#2bcaff"]}
        style={styles.container}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <LottieView
            source={Animation1}
            style={{ width: "70%", aspectRatio: 0.9, alignSelf: "center" }}
            autoPlay
            loop
          />
          <View
            style={{
              height: "50%",
              width: "90%",
              backgroundColor: "white",
              borderRadius: 25,
              alignSelf: "center",
              opacity: 0.7,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}
            >
              Who Are We?
            </Text>
            <Text style={{ textAlign: "left", fontSize: 17, margin: 20 }}>
              The May Center is a center affiliated with the Jerusalem
              Municipality. Its job is to give a warm atmosphere to all ages and
              respect ideas and desires for every society in Jerusalem. Part of
              our project was the "Jerusalem Youth" side of the center. The
              principle of the project is to give Jerusalem youths everything
              they need in one place, this includes events, coupons,
              understanding their eligibility, and of course communicating with
              the center itself.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f9c5d1",

    flex: 10000,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    fontSize: 50,
    backgroundColor: "#252250",
  },
});
