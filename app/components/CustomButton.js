import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext"

const CustomButton = ({
  title,
  onPress,
  bgColor,
  textColor,
  fullWidth = true,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor || theme.colors.primary,
          width: fullWidth ? "100%" : "auto",
          borderRadius: theme.radius.md,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: textColor || theme.colors.white,
            fontSize: theme.fontSizes.md,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    fontWeight: "600",
  },
});
