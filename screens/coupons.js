//---------------GENERAL IMPORTS ------------------------------
import React, { useState } from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Modal,
  Pressable,
  Platform,
} from "react-native";
const { width } = Dimensions.get("screen");
import {
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
//---------------GENERAL IMPORTS ------------------------------

//gradient background import
import { LinearGradient } from "expo-linear-gradient";
//--------------------------
//---------------------- Import colours -----------------------
import Colours from "../assets/Colours/Colours";
//---------------------- Import colours -----------------------

//------------------------- Qr Code Generator -------------------

import QRCode from "react-native-qrcode-svg";

//------------------------- Qr Code Generator -------------------

//import database from firebase.
import { db } from "../Database/firebase-config";
import { ref, set,  onValue } from "firebase/database";

//data of the coupons
var DATA= [];//all the data of the Coupons 

var Coupons = ref(db, "CouponData");//get the data under CouponData Reference from within the firebase

onValue(Coupons, (snapshot) => {//get data from firebase
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var obj = childData;
    DATA.push(obj);//push data from firebase to the app
  });


});

//----------------------------------------------------------------------------

//---------------- variables ---------------------

const OVERFLOW_HEIGHT = 70; //height of the overflow
const SPACING = 10; //text spacing
const ITEM_WIDTH = width * 0.6; //width of the image
const ITEM_HEIGHT = ITEM_WIDTH * 1.7; //image height
const VISIBLE_ITEMS = 3; //how many items can be visible in each cycle

//---------------- variables ---------------------

const OverflowItems = ({ data, scrollXAnimated }) => {
  //array  of the item title & Location.
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>

              <View style={styles.itemContainerRow}>
                <Image
                  source={require("../assets/location-icon.png")}
                  style={{ width: 15, height: 15, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text style={[styles.location]}>{item.location}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};
//------------------------------------------------------------------

//--------------- generate coupon code ----------------------
function generateCode(codeLength) {
  var numberChars = "0123456789";
  var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerChars = "abcdefghijklmnopqrstuvwxyz";
  var allChars = numberChars + upperChars + lowerChars;
  var randCodeArray = Array(codeLength);
  randCodeArray[0] = numberChars;
  randCodeArray[1] = upperChars;
  randCodeArray[2] = lowerChars;
  randCodeArray = randCodeArray.fill(allChars, 3);
  return shuffleArray(
    randCodeArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join("");
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
//--------------- generate coupon code ----------------------



export default function App() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [couponCode, setCouponCode] = useState("");



  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.main}>
      <LinearGradient // linear gradient background
        colors={["#eda4e7", "#2bcaff"]}
        style={styles.container}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Coupon Title:{" "}
                <Text style={{ fontWeight: "bold" }}>{itemTitle}</Text>
              </Text>
              <Text style={styles.modalText}>
                Coupon Code:{" "}
                <Text style={{ fontWeight: "bold" }}>{couponCode}</Text>
              </Text>
              <View style={{ padding: 20 }}>
                <QRCode value={couponCode} />
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close Coupon</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <GestureHandlerRootView style={{ flex: 1 }}>
          <FlingGestureHandler
            key="left"
            direction={Directions.LEFT}
            onHandlerStateChange={(ev) => {
              if (ev.nativeEvent.state === State.END) {
                if (index === data.length - 1) {
                  return;
                }
                setActiveIndex(index + 1);
              }
            }}
          >
            <FlingGestureHandler
              key="right"
              direction={Directions.RIGHT}
              onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                  if (index === 0) {
                    return;
                  }
                  setActiveIndex(index - 1);
                }
              }}
            >
              <SafeAreaView style={styles.container}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 50,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  COUPONS
                </Text>
                <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
                <FlatList
                  data={data}
                  keyExtractor={(_, index) => String(index)}
                  horizontal
                  inverted
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: "center",
                    padding: SPACING * 3,
                    paddingLeft: 90,
                  }}
                  scrollEnabled={false}
                  removeClippedSubviews={false}
                  CellRendererComponent={({
                    item,
                    index,
                    children,
                    style,
                    ...props
                  }) => {
                    const newStyle = [style, { zIndex: data.length - index }];
                    return (
                      <View style={newStyle} index={index} {...props}>
                        {children}
                      </View>
                    );
                  }}
                  renderItem={({ item, index }) => {
                    const inputRange = [index - 1, index, index + 1];
                    const translateX = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [50, 0, 200], //change -580 to the value you need
                    });
                    const scale = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [0.8, 1, 1.3],
                    });
                    const opacity = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                    });

                    return (
                      <Animated.View
                        style={{
                          position: "absolute",
                          left: -ITEM_WIDTH / 2,
                          opacity,
                          transform: [
                            {
                              translateX,
                            },
                            { scale },
                          ],
                        }}
                      >
                        <Image
                          source={{ uri: item.poster }}
                          style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            borderRadius: 16,
                          }}
                        />

                        <View
                          style={{
                            marginTop: 10,
                            padding: 8,
                            borderRadius: 30,
                            flex: 1,
                            backgroundColor: Colours.pink,
                          }}
                        >
                          <Pressable
                            style={{ alignItems: "center" }}
                            onPress={() => {
                              setModalVisible(true);
                              setItemTitle(item.title);
                              setCouponCode(generateCode(13));
                         
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "bold",
                              }}
                            >
                              Get Coupon
                            </Text>
                          </Pressable>
                        </View>
                      </Animated.View>
                    );
                  }}
                />
              </SafeAreaView>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </GestureHandlerRootView>
      </LinearGradient>
    </View>
  );
}

//-------------------------------------------------------------------

//****************  STYLES ***************** */

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f9c5d1",

    flex: 10000,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
    fontWeight: "bold",
    color: "white",
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
    marginLeft: 20,
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
//****************  STYLES ***************** */
