import React from "react";
import { SafeAreaView, Image, StyleSheet, View } from "react-native";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../theme/ThemeContext"
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const Onboarding = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image
        source={require("../image/onboarding_img.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ alignItems: "center" }}>
        <CustomText size={responsiveFontSize(2.6)} weight="700" align="center">
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
