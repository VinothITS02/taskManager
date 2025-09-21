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
import { ShowToastMessage } from "../components/ShowToastMessage";
import { postAPI } from "../utils/apis";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import CommonLoader from "../components/CommonLoader";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("Test@gmail.com");
  const [password, setPassword] = useState("test@12345");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      if (!username) return ShowToastMessage("Please enter username");
      if (!password) return ShowToastMessage("Please enter the password");

      const body = { emailId: username, password };

      setLoading(true);
      console.log("🔄 Loader should be visible now");
      const res = await postAPI("login", body);
      setLoading(false);

      if (!res?.success) {
        ShowToastMessage(res?.message);
      } else {
        ShowToastMessage(res?.message, "success");
        dispatch(setCredentials({ user: res.data, token: "dummy-token" }));
        await AsyncStorage.setItem("userToken", "dummy-token");
        navigation.replace("MainTabs");
      }
    } catch (err) {
      setLoading(false);
      ShowToastMessage("Something went wrong!", err?.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }} edges={["top"]} />

      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={["left", "right", "bottom"]}
      >
        <Image
          source={require("../image/login_img.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <CustomText size={responsiveFontSize(2.8)} weight="700" align="center">
          Hello,
        </CustomText>
        <CustomText size={responsiveFontSize(2.8)} weight="700" align="center">
          Welcome back again
        </CustomText>

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

        <TouchableOpacity style={styles.forgotPassword}>
          <CustomText size={responsiveFontSize(1.6)} color={theme.colors.gray}>
            Forget Password?
          </CustomText>
        </TouchableOpacity>

        <CustomButton title="Sign in" onPress={handleLogin} />

        <CustomText
          size={responsiveFontSize(1.8)}
          color={theme.colors.gray}
          align="center"
        >
          or continue with
        </CustomText>

        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Icon name="google" size={responsiveFontSize(4)} color={theme.colors.danger} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="apple" size={responsiveFontSize(4)} color={theme.colors.text} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="facebook" size={responsiveFontSize(4)} color={theme.colors.secondary} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          <CustomText size={responsiveFontSize(1.8)} color={theme.colors.gray} align="center">
            Don’t have an account?{" "}
            <CustomText color={theme.colors.primary} weight="600">
              Sign up
            </CustomText>
          </CustomText>
        </TouchableOpacity>
      </SafeAreaView>

      {/* ✅ Loader should be placed outside SafeAreaView */}
      <CommonLoader visible={loading} />
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
