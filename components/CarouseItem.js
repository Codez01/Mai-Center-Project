//-------------------------------- general imports ------------------------------
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

//-------------------------------- general imports ------------------------------

//import database from firebase.
import { db } from "../Database/firebase-config";
import { ref, set } from "firebase/database";

const { width, height } = Dimensions.get("window"); //get width height of the current window

//-------------------------
import Coupon from "../screens/coupons";

//function for handling the clicked item in the carousel

const itemClicked = ({ item, navigation }) => {
  console.log("itemmm title ----> " + item.title);
  navigation.navigate("TrendingEventDetails", { selectEvent: item });
};
//-------------------------------------------------------

//function for rendering the carousel item in a specific design
const CarouselItem = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => itemClicked({ item, navigation })}>
      <View style={styles.cardView}>
        <Image style={styles.image} source={{ uri: item.poster }} />
        <View style={styles.textView}>
          <Text style={styles.itemTitle}> {item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
//------------------------------------------------------------

//****************** STYLE SHEET ********************** */
const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 40,
    height: height / 3,
    backgroundColor: "white",
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 40,
    height: height / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

//****************** STYLE SHEET ********************** */

//===================== EXPORT ======================
export default CarouselItem;
//===================== EXPORT ======================
