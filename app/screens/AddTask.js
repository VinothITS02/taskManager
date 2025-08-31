import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../theme/ThemeContext";
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
} from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTask = () => {
  const { theme } = useTheme();

  const [taskName, setTaskName] = useState("");
  const [overview, setOverview] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [comment, setComment] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSubmit = () => {
    console.log({
      taskName,
      startDate,
      endDate,
      overview,
      assignTo,
      comment,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* StatusBar */}
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
      <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
          <CustomText
            size={theme.fontSizes.lg}
            weight="700"
            color={theme.colors.white}
          >
            Add Task
          </CustomText>
        </View>

        <View style={styles.form}>
          {/* Task Name */}
          <CustomInput
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
          />

          {/* Date of Start */}
          <View style={styles.dateInput}>
            <TouchableOpacity
              style={styles.dateWrapper}
              onPress={() => setShowStartPicker(true)}
            >
              <CustomText>{startDate.toDateString()}</CustomText>
              <Icon name="calendar" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          {/* Date of End */}
          <View style={styles.dateInput}>
            <TouchableOpacity
              style={styles.dateWrapper}
              onPress={() => setShowEndPicker(true)}
            >
              <CustomText>{endDate.toDateString()}</CustomText>
              <Icon name="calendar" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}

          {/* Overview */}
          <CustomInput
            placeholder="Overview"
            value={overview}
            onChangeText={setOverview}
          />

          {/* Assign To */}
          <CustomInput
            placeholder="Assign to"
            value={assignTo}
            onChangeText={setAssignTo}
          />

          {/* Comment */}
          <CustomInput
            placeholder="Comment"
            value={comment}
            onChangeText={setComment}
          />

          {/* Submit Button */}
          <CustomButton
            title="Create a task"
            onPress={handleSubmit}
            style={{ marginTop: hp(2) }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    padding: wp(4),
    alignItems: "center",
  },
  form: {
    padding: wp(4),
  },
  dateInput: {
    backgroundColor: "#EAFBEF",
    borderRadius: 8,
    marginBottom: hp(1.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
  },
  dateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
