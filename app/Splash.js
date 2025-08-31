import React, { useEffect } from "react";
import { Image, StyleSheet, ActivityIndicator, StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "./components/CustomText";
import { useTheme } from "./theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = ({ navigation }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Simulate small delay (like API call)
                await new Promise((resolve) => setTimeout(resolve, 1500));

                const userToken = await AsyncStorage.getItem("userToken");

                if (userToken) {
                    navigation.replace("MainTabs"); // ✅ logged in
                } else {
                    navigation.replace("Onboarding"); // ✅ new user
                }
            } catch (error) {
                console.log("Error checking login:", error);
                navigation.replace("Onboarding");
            }
        };

        checkLoginStatus();
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* StatusBar */}
            <StatusBar
                barStyle="dark-content"
                backgroundColor={theme.colors.background}
            />

            {/* SafeArea for notch/status bar */}
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
                    source={require("./image/onboarding_img.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <CustomText
                    size={theme.fontSizes.lg}
                    weight="700"
                    color={theme.colors.primary}
                    align="center"
                >
                    Task Manager
                </CustomText>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                    style={{ marginTop: 20 }}
                />
            </SafeAreaView>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
});
