import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

const Task = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(15);

  const weekDays = [
    { day: "Sun", date: 12 },
    { day: "Mon", date: 13 },
    { day: "Tue", date: 14 },
    { day: "Wed", date: 15 },
    { day: "Thu", date: 16 },
    { day: "Fri", date: 17 },
    { day: "Sat", date: 18 },
  ];

  const tasks = [
    {
      id: 1,
      title: "Team brainstorming session",
      time: "9:00 AM",
      details: "Discuss project strategies",
      date: 15,
    },
    {
      id: 2,
      title: "Project presentation",
      time: "2:00 PM",
      details: "Finalize project plan",
      date: 15,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* StatusBar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      {/* SafeArea for notch / status bar */}
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }} edges={["top"]} />

      {/* Main Content */}
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        {/* Header */}
        <AppHeader
          title="Task List"
          subtitle="Upcoming Task"
          profileImg="https://randomuser.me/api/portraits/men/41.jpg"
        />

        {/* Date Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateRow}
        >
          {weekDays.map((item) => (
            <TouchableOpacity
              key={item.date}
              style={styles.dateItem}
              onPress={() => setSelectedDate(item.date)}
            >
              <CustomText
                size={theme.fontSizes.sm}
                color={theme.colors.text}
                align="center"
              >
                {item.day}
              </CustomText>
              <View
                style={[
                  styles.dateCircle,
                  selectedDate === item.date && {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
              >
                <CustomText
                  size={theme.fontSizes.sm}
                  color={
                    selectedDate === item.date
                      ? theme.colors.white
                      : theme.colors.text
                  }
                  align="center"
                >
                  {item.date}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Task Section */}
        <View style={styles.taskSection}>
          {/* Big Date Left */}
          <View style={styles.dateLeft}>
            <CustomText size={theme.fontSizes.md} weight="700">
              {selectedDate}
            </CustomText>
            <CustomText size={theme.fontSizes.sm} color={theme.colors.gray}>
              {weekDays.find((d) => d.date === selectedDate)?.day || ""}
            </CustomText>
          </View>

          {/* Task Cards */}
          <View style={{ flex: 1 }}>
            {tasks
              .filter((t) => t.date === selectedDate)
              .map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.taskCard,
                    { backgroundColor: theme.colors.lightGray },
                  ]}
                >
                  <CustomText weight="600">{item.title}</CustomText>
                  <CustomText size={theme.fontSizes.sm} color={theme.colors.gray}>
                    {item.time}
                  </CustomText>
                  <CustomText size={theme.fontSizes.sm}>{item.details}</CustomText>
                </View>
              ))}
          </View>
        </View>

        {/* Floating Add Button */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        >
          <Icon name="plus" size={28} color={theme.colors.white} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  dateRow: {
    marginTop: hp(2),
    paddingHorizontal: wp(3),
  },
  dateItem: {
    alignItems: "center",
    marginRight: wp(4),
  },
  dateCircle: {
    marginTop: 4,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  taskSection: {
    flexDirection: "row",
    padding: wp(4),
  },
  dateLeft: {
    width: wp(15),
    alignItems: "center",
  },
  taskCard: {
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 12,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 30,
    padding: 14,
    elevation: 5,
  },
});
