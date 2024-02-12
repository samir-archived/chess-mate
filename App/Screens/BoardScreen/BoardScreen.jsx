import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ChessBoard from "./ChessBoard";

export default function BoardScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", gap: 10, padding: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-circle-outline" size={27} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Chess Mate
        </Text>
      </TouchableOpacity>
      <ChessBoard />
    </View>
  );
}
