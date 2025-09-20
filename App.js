import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./app/theme/ThemeContext";
import AppNavigator from "./app/AppNavigator";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { View, ActivityIndicator } from "react-native";

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" />
  </View>
);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
