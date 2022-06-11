import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  ImageBackground,
  Pressable
} from "react-native";
const { width, height } = Dimensions.get("screen");

import Rights from "../Rights/rightsData";

//gradient background import
import { LinearGradient } from "expo-linear-gradient";
//--------------------------

// faker.seed(10);
// const DATA = Rights.map((_, i) => {
//     return {
//         key: faker.random.uuid(),
//         image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
//         name: faker.name.findName(),
//         jobTitle: faker.name.jobTitle(),
//         email: faker.internet.email(),
//     };
// });

// console.log(DATA);

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient // linear gradient background
        colors={["#eda4e7", "#2bcaff"]}
        style={{ flex: 1, paddingTop: 40 }}
        start={{ x: 0, y: 2 }}
        end={{ x: 2, y: 2 }}
      >
        <View>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              marginTop: 17,
              paddingTop: 25,
              fontSize: 60,
              fontWeight: "bold",
            }}
          >
            RIGHTS
          </Text>
        </View>

        <View style={{ flex: 0.96, backgroundColor: "transparent", height: 5 }}>
          <Animated.FlatList
            data={Rights}
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
                <Pressable
                  onPress={() =>
                    navigation.navigate("RightCategory", {
                      // Username: auth.currentUser.email,
                      RightClicked: item.name,
                    })
                  }
                >
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
                    <Image
                      source={item.image}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2,
                      }}
                    />

                    <View>
                      <Text style={{ fontSize: 22, fontWeight: "700" }}>
                        {" "}
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 14, opacity: 0.7 }}>
                        {" "}
                        {item.info}
                      </Text>
                    </View>
                  </Animated.View>
                </Pressable>
              );
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
