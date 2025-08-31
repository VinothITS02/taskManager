import React from "react";
import { SafeAreaView } from "react-native";
import CustomText from "../components/CustomText";
import { useTheme } from "../theme/ThemeContext"

const Inbox = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center" }}>
      <CustomText size={theme.fontSizes.lg} weight="700">Inbox Screen</CustomText>
    </SafeAreaView>
  );
};

export default Inbox;
