import React, { useEffect } from "react";
import { SafeAreaView, Image, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "./components/CustomText"
import { useTheme } from "./theme/ThemeContext"

const Splash = ({ navigation }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Simulate small delay (like API call)
                await new Promise((resolve) => setTimeout(resolve, 1500));

                const userToken = await AsyncStorage.getItem("userToken");

                if (userToken) {
                    // 👇 User logged in → go to MainTabs
                    navigation.replace("MainTabs");
                } else {
                    // 👇 No login → go to Onboarding
                    navigation.replace("Onboarding");
                }
            } catch (error) {
                console.log("Error checking login:", error);
                navigation.replace("Onboarding");
            }
        };

        checkLoginStatus();
    }, [navigation]);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
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
