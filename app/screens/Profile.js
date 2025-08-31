import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from "react-native";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../theme/ThemeContext";
import {
    responsiveWidth as wp,
    responsiveHeight as hp,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = ({ navigation }) => {
    const { theme } = useTheme();

    const menuItems = [
        "Account Information",
        "Notification",
        "Terms & conditions",
        "Ask a question",
        "Email notification",
        "Meetings",
        "Task",
        "Help",
    ];

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        navigation.replace("Login");
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* Status Bar */}
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.colors.primary}
            />

            {/* SafeArea for notch/status bar */}
            <SafeAreaView
                style={{ backgroundColor: theme.colors.primary }}
                edges={["top"]}
            />

            {/* Main Content */}
            <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
                {/* Header */}
                <AppHeader
                    title="Profile Details"
                    subtitle="John Deo"
                    profileImg="https://randomuser.me/api/portraits/women/44.jpg"
                    onBellPress={() => console.log("Bell pressed")}
                />

                {/* Menu Items */}
                <ScrollView style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <CustomText size={theme.fontSizes.md}>{item}</CustomText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Logout Button */}
                <View style={styles.footer}>
                    <CustomButton title="Logout" onPress={handleLogout} />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        marginTop: hp(2),
        paddingHorizontal: wp(4),
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: hp(1.8),
    },
    footer: {
        padding: wp(4),
    },
});
