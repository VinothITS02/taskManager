import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useTheme } from "../theme/ThemeContext"

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  leftIcon = "user",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={styles(theme).inputWrapper}>
      <Icon
        name={leftIcon}
        size={responsiveFontSize(2.4)}
        color={theme.colors.gray}
        style={styles(theme).leftIcon}
      />

      <TextInput
        style={styles(theme).input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        secureTextEntry={secureTextEntry && !showPassword}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles(theme).rightIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={responsiveFontSize(2.4)}
            color={theme.colors.gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = (theme) =>
  StyleSheet.create({
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.lightGray,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    leftIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      paddingVertical: theme.spacing.sm,
      color: theme.colors.text,
    },
    rightIcon: {
      marginLeft: theme.spacing.sm,
    },
  });
