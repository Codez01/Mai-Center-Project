//general imports
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

//---------------------------

//gradient background import
import { LinearGradient } from "expo-linear-gradient";
//--------------------------

//carousel imports
import Carousel from "../components/Carousel";

//get width height of the current window
const { width, height } = Dimensions.get("window");

//import safe area view
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

//lottie
import LottieView from "lottie-react-native";
import ChatAnim from "../assets/chatAnimation.json";
import Colours from "../assets/Colours/Colours";

//get events from all events
import { getEvents } from "../carouselData/carouselData";

//authentication & database
import { auth, database } from "../Database/firebase-config";
import { signOut } from "firebase/auth";

//entypoo
import { Entypo } from "@expo/vector-icons";

//import signout icon
const SignoutIcon = require("../assets/Signout_icon.png");

//----------------------------
//  <View style = {styles.main}>
//           <LinearGradient // linear gradient background
//         colors={['#f9c5d1', '#2aa7c7']}
//         style={styles.container}
//         start={{ x: 1, y: 0.1 }}
//         end={{ x: 1, y: 2 }}
//       >
//           <View >
//------------------------------

//----------------------------
export default function Home({ navigation }) {
  const [events, setEvents] = React.useState([]);
  const [NoEvents, setNoEvents] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      if (events.length == 0) {
        setNoEvents(true);
      } else {
        setNoEvents(false);
        events.sort((b, a) => a.rating - b.rating); // sort events by rating
      }

      setEvents([...events.slice(0, events.length / 2 + 1)]);
    };

    if (events.length === 0) {
      fetchData(events);
    }
  }, [events]);

  return (
    <View style={styles.main}>
      <LinearGradient // linear gradient background
        colors={["#eda4e7", "#2bcaff"]}
        style={styles.container}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.scrollView}>
            <View>
              {/* logo */}
              <View
                style={{
                  width: width / 2,
                  height: height / 20,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 2,
                    height: height / 3,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  source={require("../assets/logo.png")}
                />
                <View style={{ marginLeft: "10%" }}>
                  <TouchableOpacity
                    onPress={() => {
                      signOut(auth)
                        .then(() => {
                          navigation.navigate("Login");
                        })
                        .catch((error) => {
                          Alert.alert("Failed To Signout.");
                        });
                    }}
                  >
                    <Image
                      style={{
                        width: "55%",
                        height: "55%",
                        resizeMode: "contain",
                        marginRight: "20%",
                        alignSelf: "center",
                      }}
                      source={SignoutIcon}
                    />
                    <Text style={{ textAlign: "center" }}>Sign out</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* logo */}

              {/*//trending now + carousel view */}
              <View style={{ paddingTop: height - 610 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      paddingLeft: 20,
                      fontWeight: "bold",
                      fontSize: 30,
                    }}
                  >
                    Trending
                  </Text>
                  <Text style={{ paddingLeft: 20, fontSize: 30 }}>Events</Text>
                </View>
                <Carousel data={events} navigation={navigation} />

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Chat", {
                      Username: auth.currentUser.email,
                    })
                  }
                  style={styles.chatButton}
                >
                  <Entypo name="chat" size={24} color={"grey"} />
                </TouchableOpacity>

                <View
                  style={{ alignSelf: "center", flex: 1, marginTop: "30%" }}
                ></View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/*//trending now + carousel view */}
      </LinearGradient>
    </View>
  );
}

//************************* STYLESHEET *************************** */
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f9c5d1",

    flex: 10000,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollView: {
    marginHorizontal: 1,
  },
  chatButton: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colours.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginLeft: "80%",
  },
});

//************************* STYLESHEET *************************** */
