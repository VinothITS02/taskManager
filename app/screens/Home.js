import React from "react";
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

const Home = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary} // ✅ Status bar green
      />

      {/* Safe area background ONLY for top */}
      <SafeAreaView
        style={{ backgroundColor: theme.colors.primary }}
        edges={["top"]}
      />

      {/* Main content area */}
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <AppHeader />

          {/* Today Task Summary */}
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: theme.colors.lightGray },
            ]}
          >
            <CustomText weight="600">Today Task Summary</CustomText>
            <CustomText size={theme.fontSizes.sm}>Progress 85%</CustomText>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddTask")}>
              <Icon name="plus" size={20} color={theme.colors.white} />
            </TouchableOpacity>
          </View>

          {/* Upcoming Task */}
          <View style={styles.section}>
            <CustomText weight="700" size={theme.fontSizes.lg}>
              Upcoming Task
            </CustomText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: hp(1) }}
            >
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.upcomingCard}>
                  <CustomText weight="600">Task {item}</CustomText>
                  <CustomText size={theme.fontSizes.sm}>
                    Details of Task {item}
                  </CustomText>
                  <CustomText
                    size={theme.fontSizes.sm}
                    color={theme.colors.gray}
                  >
                    Status : Pending
                  </CustomText>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* My Task List */}
          <View style={styles.section}>
            <CustomText weight="700" size={theme.fontSizes.lg}>
              My Task List
            </CustomText>

            {/* Tabs */}
            <View style={styles.tabs}>
              {["All", "Pending", "In Progress", "Done"].map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tab,
                    index === 0 && { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <CustomText
                    size={theme.fontSizes.sm}
                    color={
                      index === 0 ? theme.colors.white : theme.colors.text
                    }
                  >
                    {tab}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Task List */}
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.taskItem}>
                <View>
                  <CustomText weight="600">Task {item}</CustomText>
                  <CustomText size={theme.fontSizes.sm}>
                    Details of Task {item}
                  </CustomText>
                </View>
                <View style={styles.statusContainer}>
                  <CustomText
                    size={theme.fontSizes.sm}
                    color={theme.colors.gray}
                  >
                    Pending
                  </CustomText>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: theme.colors.danger },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  summaryCard: {
    margin: wp(4),
    padding: wp(4),
    borderRadius: 12,
    position: "relative",
  },
  addBtn: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: "#22c55e",
    borderRadius: 20,
    padding: 6,
  },
  section: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  upcomingCard: {
    width: wp(40),
    padding: wp(3),
    marginRight: wp(3),
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  tabs: {
    flexDirection: "row",
    marginTop: hp(1.5),
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#f1f1f1",
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: wp(4),
    marginTop: hp(1.5),
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 6,
  },
});
