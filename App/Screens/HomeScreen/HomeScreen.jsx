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
        {/* Your Record */}
        <Heading text="Game Records" isRecord={true} />
        {/* <Text style={RecordCss.heading}>Game Records</Text> */}
        <View style={RecordCss.tableHeader}>
          <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
            Position
          </Text>
          <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
            Player
          </Text>
          <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>Time</Text>
        </View>
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
