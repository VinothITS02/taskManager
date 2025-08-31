import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CustomText from "../components/CustomText";
import { useTheme } from "../theme/ThemeContext";
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
} from "react-native-responsive-dimensions";
import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Inbox = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const todayMessages = [
    { id: 1, name: "John Doe", status: "Hello there!", img: "https://randomuser.me/api/portraits/men/12.jpg" },
    { id: 2, name: "Jane Smith", status: "Busy", img: "https://randomuser.me/api/portraits/women/45.jpg" },
    { id: 3, name: "Michael Johnson", status: "Available", img: "https://randomuser.me/api/portraits/men/33.jpg" },
    { id: 4, name: "Emily Williams", status: "Away", img: "https://randomuser.me/api/portraits/women/27.jpg" },
    { id: 5, name: "David Brown", status: "On a call", img: "https://randomuser.me/api/portraits/men/52.jpg" },
  ];

  const yesterdayMessages = [
    { id: 6, name: "Sophia Davis", status: "See you soon", img: "https://randomuser.me/api/portraits/women/56.jpg" },
    { id: 7, name: "James Miller", status: "Working late", img: "https://randomuser.me/api/portraits/men/66.jpg" },
  ];

  const renderMessage = ({ item }) => (
    <View style={[styles.messageCard, { backgroundColor: theme.colors.lightGray }]}>
      <Image source={{ uri: item.img }} style={styles.avatar} />
      <View style={{ marginLeft: wp(3) }}>
        <CustomText weight="600">{item.name}</CustomText>
        <CustomText size={theme.fontSizes.sm} color={theme.colors.gray}>
          {item.status}
        </CustomText>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      {/* Safe area for top (green background) */}
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }} edges={["top"]} />

      {/* Content area */}
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        {/* Header */}
        <AppHeader
          title="Inbox"
          subtitle="New 25 Message"
          profileImg="https://randomuser.me/api/portraits/women/44.jpg"
        />

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.lightGray }]}>
          <TextInput
            placeholder="Search Member"
            placeholderTextColor={theme.colors.gray}
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, color: theme.colors.text }}
          />
          <Icon name="search" size={20} color={theme.colors.gray} />
        </View>

        {/* Today Section */}
        <View style={styles.section}>
          <CustomText weight="700" size={theme.fontSizes.md}>
            Today
          </CustomText>
          <FlatList
            data={todayMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            style={{ marginTop: hp(1.5) }}
          />
        </View>

        {/* Yesterday Section */}
        <View style={styles.section}>
          <CustomText weight="700" size={theme.fontSizes.md}>
            Yesterday
          </CustomText>
          <FlatList
            data={yesterdayMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            style={{ marginTop: hp(1.5) }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: wp(4),
    paddingHorizontal: wp(4),
    borderRadius: 10,
    height: hp(6),
  },
  section: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(3),
    borderRadius: 10,
    marginBottom: hp(1.5),
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },
});
