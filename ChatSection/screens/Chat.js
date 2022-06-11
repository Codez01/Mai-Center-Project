import React, { useState, useLayoutEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat"; //component allows us to display chat messages that are going to be sent by different users
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const backIcon = require("../../assets/left-arrow.png");

export default Chat = ({ route }) => {
  const [Username, setUsername] = React.useState(route.params.Username);

  React.useEffect(() => {
    let { Username } = route.params;
    setUsername(Username);
  }, [route.params.Username]);

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await addDoc(collection(database, Username), {});
    };
    fetchData();
    const collectionRef = collection(database, Username);

    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  //useCallback will store the messages in the Firestore
  //responsible for sending messages
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, Username), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#4267B2" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{ flex: 0, backgroundColor: "#4267B2", flexDirection: "row" }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: 20,
              marginTop: "2%",
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Image
              source={backIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: "#fff",
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              alignSelf: "center",
              padding: 20,
              borderRadius: 25,
              fontWeight: "bold",
              color: "white",
              marginLeft: "15%",
            }}
          >
            Mai Center
          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: "1%" }}>
          <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={(messages) => onSend(messages)}
            messagesContainerStyle={{
              backgroundColor: "white",
            }}
            textInputStyle={{
              backgroundColor: "#dcdedc",
              borderRadius: 25,
            }}
            alwaysShowSend
            inverted
            containerStyle={{
              backgroundColor: "white",
              borderTopColor: "#E8E8E8",
              padding: 4,
            }}
            user={{
              //object to identify which user is sending the message.
              _id: Username,
              avatar:
                "https://user-images.githubusercontent.com/99803200/158444498-5c5dc253-2868-4157-bd74-310ed2d6d07d.png",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
