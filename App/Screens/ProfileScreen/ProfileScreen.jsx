import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import Header from "../../Components/Header";
import ChessboardStyles from "./ChessboardStyles";

const ProfileSection = () => {
  const [selectedChessboard, setSelectedChessboard] = useState('classic'); // Default chessboard style

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

  return (
    <View style={styles.container}>
      <Header isProfile = {true}/>
      <ChessboardStyles selectedStyle={selectedChessboard} onSelectStyle={handleChessboardChange} />

      <View style={styles.soundToggleContainer}>
        <Text style={styles.sectionTitle}>Sound:</Text>
        <Switch
          value={soundEnabled}
          onValueChange={toggleSound}
          style={styles.soundToggle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // marginTop: 20,
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
