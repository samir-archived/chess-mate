import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../Components/Header";
import Tutorials from "./Tutorials";
import Play from "./Play";
import RecordScreen from "./RecordScreen";
import RecordCss from "../../Utils/RecordCss";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";

export default function HomeScreen() {
  return (
    <View>
      {/* Header */}
      <Header isProfile={false} />
      <View style={styles.subSection}>
        {/* Categories */}
        <Tutorials />
        {/* World Record */}
        <RecordScreen />
        {/* Play Button */}
      </View>
      <Play />
    </View>
  );
}

const styles = StyleSheet.create({
  subSection: {
    padding: "4%",
    backgroundColor: Colors.LIGHTGRAY,
  },
});
