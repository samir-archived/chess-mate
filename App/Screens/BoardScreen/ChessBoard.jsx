import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Board from "./BoardDesign/Board";

const size = Dimensions.get("window");

export default function ChessBoard() {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: size.height / 2.1 - size.width / 2, // Half box above center
  },
});
