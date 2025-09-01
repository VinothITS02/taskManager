import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useTheme } from "../theme/ThemeContext";
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = ({ navigation }) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    // ✅ Replace with actual signup logic
    await AsyncStorage.setItem("userToken", "dummy-token");
    navigation.replace("MainTabs");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      {/* SafeArea for notch */}
      <SafeAreaView
        style={{ backgroundColor: theme.colors.primary }}
        edges={["top"]}
      />

      {/* Main Content */}
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={["left", "right", "bottom"]}
      >
        {/* Top Illustration */}
        <Image
          source={require("../image/signup_img.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Title */}
        <CustomText
          size={responsiveFontSize(3)}
          weight="700"
          align="center"
          style={{ marginBottom: hp(2) }}
        >
          Sign up
        </CustomText>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            leftIcon="user"
          />
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            leftIcon="envelope"
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock"
          />
        </View>

        {/* Sign Up Button */}
        <CustomButton title="Sign up" onPress={handleSignup} />

        {/* Or Continue With */}
        <CustomText
          size={responsiveFontSize(1.8)}
          color={theme.colors.gray}
          align="center"
          style={{ marginVertical: hp(1.5) }}
        >
          or continue with
        </CustomText>

        {/* Social Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Icon
              name="google"
              size={responsiveFontSize(4)}
              color={theme.colors.danger}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="apple"
              size={responsiveFontSize(4)}
              color={theme.colors.text}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="facebook"
              size={responsiveFontSize(4)}
              color={theme.colors.secondary}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Already have an account? */}
        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.navigate("Login")}
        >
          <CustomText
            size={responsiveFontSize(1.8)}
            color={theme.colors.gray}
            align="center"
          >
            Already have an account?{" "}
            <CustomText color={theme.colors.primary} weight="600">
              Sign in
            </CustomText>
          </CustomText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: wp(5),
  },
  image: {
    width: wp(100),
    height: hp(25),
    marginBottom: hp(2),
  },
  inputContainer: {
    width: "100%",
    marginBottom: hp(2),
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(1.5),
  },
  socialIcon: {
    marginHorizontal: wp(4),
  },
  footer: {
    marginTop: hp(2),
  },
});
