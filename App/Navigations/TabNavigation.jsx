import React, { Component, useRef } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TutorialScreen from "../Screens/TutorialScreen/TutorialScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import BoardNavigation from "./BoardNavigation";

// Icons
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../Utils/Colors";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.PRIMARY,
        }}
      >
        <Tab.Screen
          name="home"
          component={BoardNavigation}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="tutorial"
          component={TutorialScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                Tutorial
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="folder-video" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                Profile
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default TabNavigation;
