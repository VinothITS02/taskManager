import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CustomText from "./CustomText";
import { useTheme } from "../theme/ThemeContext"
import { responsiveWidth as wp } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

const AppHeader = ({
    title,
    subtitle,
    profileImg,
    onBellPress
}) => {
    const { user } = useSelector((state) => state.auth)
    const { theme } = useTheme();

    return (
        <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
            {/* Profile Picture */}
            <Image source={{ uri: `data:image/jpeg;base64,${user.photoURL}` }} style={styles.profileImg} />

            {/* Title + Subtitle */}
            <View style={{ flex: 1, marginLeft: wp(3) }}>
                <CustomText size={theme.fontSizes.md} weight="700" color={theme.colors.white}>
                    {user.emailId}
                </CustomText>
                {subtitle && (
                    <CustomText size={theme.fontSizes.sm} color={theme.colors.white}>
                        {subtitle}
                    </CustomText>
                )}
            </View>

            {/* Bell Icon */}
            <TouchableOpacity onPress={onBellPress}>
                <Icon name="bell" size={22} color={theme.colors.white} />
            </TouchableOpacity>
        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: wp(4),
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    profileImg: { width: 40, height: 40, borderRadius: 20 },
});
