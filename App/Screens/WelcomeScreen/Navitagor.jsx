import { View, Text } from "react-native";
import React from "react";
import WelcomeScreen from "./WelcomeScreen";
import TabNavigation from "../../Navigations/TabNavigation";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const Navigator = () => {
  console.log("This function is in OtherFile.js");
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
