import { LinearGradient } from "expo-linear-gradient";
import React from "react";
const left_arrow = require("../assets/left-arrow.png");
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

const EventDetailsScreen = ({ navigation, route }) => {
  {
    /*  EventDetailsScreen get the event details by sending it from the Events component */
  }
  console.log(route.params);

  const [selectEvent, setselectEvent] = React.useState(null);

  React.useEffect(() => {
    let { selectEvent } = route.params;
    setselectEvent(selectEvent);
  }, [route.params]);

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
            navigation.navigate("Home");
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
    );
  }

  function renderHeaderSection() {
    return (
      // background image "the event image" =====//
      <ImageBackground
        source={{ uri: selectEvent?.backdrop }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: height < 700 ? height * 0.6 : height * 0.7,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {/*  ==== to get the back button to the top left===  */}
          {renderHeaderBar()}
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {/* to gradient the image with the background color */}
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "black"]}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* event name */}
              <Text
                style={{
                  color: "#fff",
                  ...{ fontSize: 30, lineHeight: 36 },
                  marginTop: 8,
                }}
              >
                {selectEvent?.title}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }

  {
    /* the details of the event "discription" */
  }
  function renderCategory() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* discription */}
        <View style={[styles.categoryContainer, { paddingHorizontal: 24 }]}>
          <Text
            style={{
              color: "#fff",
              ...{ fontSize: 14, lineHeight: 22 },
            }}
          >
            {selectEvent?.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: "#000000" }}
      style={{ backgroundColor: "#000000" }}
    >
      {/* header */}
      {renderHeaderSection()}
      {/* body, discription */}
      {renderCategory()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: "#363636",
  },
});

export default EventDetailsScreen;
