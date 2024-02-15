import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChess } from "./Design/ChessContext";
import MasterFile from "./Design/MasterFile";

const styles = StyleSheet.create({
  // Your styles here
});

const BoardScreenContent = () => {
  const { state, updateChessState } = useChess();

  // Additional logic for BoardScreenContent if needed

  return (
    <View style={styles.container}>
      {/* Your component code here */}
      <MasterFile />
    </View>
  );
};

const BoardScreen = () => {
  const { updateChessState } = useChess();

  return (
    <View>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 10, padding: 20 }}
        onPress={updateChessState} // Update the chess state when needed
      >
        <Ionicons name="arrow-back-circle-outline" size={27} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Chess Mate
        </Text>
      </TouchableOpacity>
      <BoardScreenContent />
    </View>
  );
};

export default BoardScreen;
