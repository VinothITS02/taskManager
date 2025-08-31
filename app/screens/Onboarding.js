import React from "react";
import { Image, StyleSheet, View, StatusBar } from "react-native";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../theme/ThemeContext";
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      {/* SafeArea just for notch/status bar */}
      <SafeAreaView
        style={{ backgroundColor: theme.colors.background }}
        edges={["top"]}
      />

      {/* Main content */}
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={["left", "right", "bottom"]}
      >
        <Image
          source={require("../image/onboarding_img.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={{ alignItems: "center" }}>
          <CustomText
            size={responsiveFontSize(2.6)}
            weight="700"
            align="center"
          >
            A Task Manager You Can Trust !
          </CustomText>
          <CustomText
            size={responsiveFontSize(1.8)}
            color={theme.colors.gray}
            align="center"
            style={{ marginTop: hp(1) }}
          >
            A workspace to over 10 Million influencers around the world.
          </CustomText>
        </View>

        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: hp(3) }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp(5),
  },
  image: {
    width: wp(100),
    height: hp(30),
  },
});
