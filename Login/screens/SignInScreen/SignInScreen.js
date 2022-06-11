import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import Logo from "../../../assets/LogIn_Logo.png";
import SignInVector from "../../../assets/signIn.png";
import usernameIcon from "../../../assets/usernameIcon.png";
import passwordIcon from "../../../assets/passwordIcon.png";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

//database import
import { db , auth} from "../../../Database/firebase-config";
import { ref, set, onValue } from "firebase/database";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

//import animation lotties 
import LottieView from 'lottie-react-native';
import SignInAnimation from '../../../assets/signInAnimation.json';


const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const SignInScreen = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    // validate user
    if (loading) {
      return;
    }
    setLoading(true);
        //method that authenticate a user's credentials
        if (data.email !== "" && data.password !== "") {
          signInWithEmailAndPassword(auth, data.email, data.password) //If the credentials are accurate
            .then(() => {
              setModalVisible(true);//show loading modal
              setTimeout(() => { navigation.replace("NavBar")}, 2000);
             
            })
            .catch((err) => Alert.alert("Login Error", "Wrong Email Or Password"));
        }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.root}>
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
            <LottieView source={SignInAnimation} style={{ width: '70%', aspectRatio: 0.9, alignSelf: "center" }} autoPlay loop /> 

              <Text style={styles.modalText}>Signing In...</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.4 }]}
          resizeMode="contain"
        />

        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            marginTop: "15%",
          }}
        >
          <CustomInput
            name="email"
            placeholder="Email Address"
            control={control}
            image={usernameIcon}
            iconSize={"9%"}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password should be minimum 4 characters long",
              },
            }}
            image={passwordIcon}
            iconSize={"12%"}
          />
        </View>

        <View style={{ flex: 1, width: "100%", marginTop: "10%" }}>
          <TouchableOpacity onPress={handleSubmit(onSignInPressed)}>
            <Image
              source={SignInVector}
              resizeMode="contain"
              style={{ marginLeft: "60%" }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            padding: 17,
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <View>
            <CustomButton
              text="Forgot password?"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
            />
          </View>
          <View>
            <CustomButton
              text="Don't have an account? Create one"
              onPress={onSignUpPress}
              type="TERTIARY"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 0,
    backgroundColor: "white",
  },
  logo: {
    width: "100%",
    padding: 0,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
export default SignInScreen;
