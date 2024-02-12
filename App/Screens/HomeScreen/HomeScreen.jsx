import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Tutorials from "./Tutorials";
import Play from "./Play";
import RecordScreen from "./RecordScreen";

export default function HomeScreen() {
  return (
    <View>
      {/* Header */}
      <Header />
      <View style={styles.subSection}>
        {/* Categories */}
        <Tutorials />
        {/* Your Record */}
        <RecordScreen />
        {/* Play Button */}
        <Play />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subSection: {
    padding: 15,
  },
});
