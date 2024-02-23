import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../Components/Header";
import ChessboardStyles from "./ChessboardStyles";
import Colors from "../../Utils/Colors";
import { height } from "../BoardScreen/Design/Notation";
import ChessPlayerStats from "./ChessPlayerStats";

const ProfileSection = () => {
  const [selectedChessboard, setSelectedChessboard] = useState("first"); // Default chessboard style

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Handler function to update the selected chessboard style
  const handleChessboardChange = (option) => {
    setSelectedChessboard(option);
    // logic to apply the selected chessboard style to your chessboard component
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // logic to control the sound in your application
  };

  // Assuming you have player stats data
  const playerStats = {
    playerName: 'John Doe',
    totalGames: 100,
    wins: 70,
    draws: 20,
    losses: 10,
  };

  return (
    <View style={styles.container}>
      <Header isProfile={true} />
      <View style={styles.subContainer}>
        <ChessPlayerStats {...playerStats} />
        <ChessboardStyles
          selectedStyle={selectedChessboard}
          onSelectStyle={handleChessboardChange}
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    padding: "4%",
    backgroundColor: Colors.LIGHTGRAY,
    // backgroundColor: Colors.LIGHTGREEN,
    height: height,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 10,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "lightgray",
  },
  soundToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  soundToggle: {
    marginLeft: 10,
  },
});

export default ProfileSection;
