// import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BoardScreen from '../Screens/BoardScreen/BoardScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function BoardNavigation() {
  return (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarVisible: true }}/>
    <Stack.Screen name="Board" component={BoardScreen} options={{ tabBarVisible: false }}/>
  </Stack.Navigator>
  )
}