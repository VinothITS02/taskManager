import React from "react";
import { View, ActivityIndicator, Modal, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const CommonLoader = ({ visible }) => {
    const { theme } = useTheme();

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", elevation: 10, zIndex: 10 }}>
                <ActivityIndicator size="large" color={theme?.color?.primary} />
            </View>
        </Modal>
    );
};

export default CommonLoader;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
});
