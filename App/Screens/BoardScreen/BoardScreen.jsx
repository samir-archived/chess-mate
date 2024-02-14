import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React , { useContext, createContext }from "react";
import ChessBoard from "./ChessBoard";
import Chessboard from "../Board/Chessboard";
import MasterFile from "../Board/MasterFile";
import Board from "../Board/Board";
import Piece from "../Board/Piece";
import { useNavigation } from "@react-navigation/native";

export default function BoardScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 10, padding: 20 }}
        onPress={() =>{ navigation.navigate('home'); }}
      >
        <Ionicons name="arrow-back-circle-outline" size={27} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Chess Mate
        </Text>
      </TouchableOpacity>
      {/* <Piece /> */}
      <Board />
    </View>
  );
}
