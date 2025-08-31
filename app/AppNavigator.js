import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "./theme/ThemeContext"

import Onboarding from "./screens/Onboarding"
import Login from './screens/Login'
import Home from "./screens/Home"
import Task from "./screens/Task"
import Inbox from "./screens/Inbox"
import Profile from "./screens/Profile"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 👇 Bottom Tab Navigator
const BottomTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0.5,
          borderTopColor: theme.colors.gray,
          height: 60,
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Task":
              iconName = "calendar";
              break;
            case "Inbox":
              iconName = "mail";
              break;
            case "Profile":
              iconName = "user";
              break;
            default:
              iconName = "circle";
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// 👇 Main App Navigator (Stack + Tabs)
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash" // 👈 Start at Splash
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
