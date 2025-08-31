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

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleLogin = async () => {
    // ✅ Replace with real auth logic
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

      {/* SafeArea for notch/status bar */}
      <SafeAreaView
        style={{ backgroundColor: theme.colors.primary }}
        edges={["top"]}
      />

      {/* Main Content */}
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={["left", "right", "bottom"]}
      >
        {/* Top Image */}
        <Image
          source={require("../image/login_img.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Welcome Text */}
        <CustomText size={responsiveFontSize(2.8)} weight="700" align="center">
          Hello,
        </CustomText>
        <CustomText size={responsiveFontSize(2.8)} weight="700" align="center">
          Welcome back again
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
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock"
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <CustomText size={responsiveFontSize(1.6)} color={theme.colors.gray}>
            Forget Password?
          </CustomText>
        </TouchableOpacity>

        {/* Sign In Button */}
        <CustomButton title="Sign in" onPress={handleLogin} />

        {/* Or Continue With */}
        <CustomText
          size={responsiveFontSize(1.8)}
          color={theme.colors.gray}
          align="center"
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

        {/* Sign Up Link */}
        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          <CustomText
            size={responsiveFontSize(1.8)}
            color={theme.colors.gray}
            align="center"
          >
            Don’t have an account?{" "}
            <CustomText color={theme.colors.primary} weight="600">
              Sign up
            </CustomText>
          </CustomText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: hp(1.6),
  },
  image: {
    width: wp(100),
    height: hp(25),
    marginBottom: hp(3),
  },
  inputContainer: {
    width: "100%",
    marginTop: hp(2),
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(1.5),
  },
  socialIcon: {
    marginHorizontal: wp(4),
  },
  signupContainer: {
    marginTop: hp(2),
  },
});
