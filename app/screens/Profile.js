import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext"
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";

const Profile = () => {
  const { theme, toggleMode, changeOpco, opco } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomText size={theme.fontSizes.lg} weight="700">
        Profile Settings
      </CustomText>

      <CustomButton
        title="Toggle Theme Mode"
        onPress={toggleMode}
        bgColor={theme.colors.primary}
      />

      <CustomButton
        title={`Switch OPCO (Current: ${opco})`}
        onPress={() => changeOpco(opco === "default" ? "opco1" : "default")}
        bgColor={theme.colors.secondary}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
