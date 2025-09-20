import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./app/theme/ThemeContext"
import AppNavigator from "./app/AppNavigator";
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
         <Toast />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
