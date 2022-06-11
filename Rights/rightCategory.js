import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
const { width, height } = Dimensions.get("window");

//gradient background import
import { LinearGradient } from "expo-linear-gradient";
//--------------------------
//import arrow image
const left_arrow = require("../assets/left-arrow.png");
//----------------------------

import { getDrivingRights } from "./DrivingRights";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const RightCategory = ({ navigation, route }) => {
  {
    /*  EventDetailsScreen get the event details by sending it from the Events component */
  }

  const [selectRightCategory, setRightCategory] = React.useState(null);

  React.useEffect(() => {
    let { RightClicked } = route.params;
    console.log(RightClicked);
    if (RightClicked.includes("DRIVING")) {
      const fetchData = async () => {
        const DrivingRights = await getDrivingRights();
        setRightCategory(DrivingRights);
      };
      fetchData();
    } else {
      setRightCategory([]);
    }

    console.log(selectRightCategory);
  }, [route.params]);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient // linear gradient background
        colors={["#eda4e7", "#2bcaff"]}
        style={{ flex: 1, paddingTop: 40 }}
        start={{ x: 0, y: 2 }}
        end={{ x: 2, y: 2 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            marginTop: Platform.OS === "ios" ? 40 : 20,
            paddingHorizontal: 24,
          }}
        >
          {/* back button to go back to events page*/}
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: 20,
              marginTop: "10%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
            onPress={() => {
              navigation.navigate("Rights");
            }}
          >
            <Image
              source={left_arrow}
              style={{
                width: 20,
                height: 20,
                tintColor: "#fff",
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.96, backgroundColor: "transparent", height: 5 }}>
          <Animated.FlatList
            data={selectRightCategory}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{
              padding: SPACING,
              paddingTop: StatusBar.currentHeight || 42,
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];

              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 0.5),
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });

              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    flexDirection: "row",
                    padding: SPACING,
                    marginBottom: SPACING,
                    backgroundColor: "white",
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    elevation: 5,
                    opacity,
                    transform: [{ scale }],
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 17, fontWeight: "700" }}>
                      {" "}
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, opacity: 0.7 }}>
                      {" "}
                      {item.info}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RightCategory;
