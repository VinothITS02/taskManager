import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./app/theme/ThemeContext"
import AppNavigator from "./app/AppNavigator"

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
