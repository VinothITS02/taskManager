import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext"

const CustomText = ({
  children,
  size,
  weight = "400",
  color,
  align = "left",
  style,
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: size || theme.fontSizes.md,
          fontWeight: weight,
          color: color || theme.colors.text,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    marginVertical: 4,
  },
});
