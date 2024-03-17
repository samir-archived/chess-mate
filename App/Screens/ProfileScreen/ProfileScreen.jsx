import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../Components/Header";
import ChessboardStyles from "./ChessboardStyles";
import Colors from "../../Utils/Colors";
import { height } from "../BoardScreen/Design/Notation";
import ChessPlayerStats from "./ChessPlayerStats";
import Play from "../HomeScreen/Play";
import { useChess } from "../BoardScreen/Design/ChessContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileSection = () => {
  const [selectedChessboard, setSelectedChessboard] = useState("first"); // Default chessboard style

  const [soundEnabled, setSoundEnabled] = useState(true);

  const { isGuest } = useChess();

  useEffect(() => {
    const getSavedGame = async () => {
      const savedGame = await AsyncStorage.getItem("chessBoard");
      setSelectedChessboard(savedGame);
    };
    getSavedGame();
  }, []);

  const handleChessboardChange = async (option) => {
    await AsyncStorage.setItem("chessBoard", option);
    setSelectedChessboard(option);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // logic to control the sound in application
  };

  const [playerStats, setPlayerStats] = useState({
    totalGames: 0,
    wins: 0,
    draws: 0,
    losses: 0,
  });

  // Fetch player stats from AsyncStorage
  // useEffect(() => {
  const fetchPlayerStats = async () => {
    try {
      const existingData = await AsyncStorage.getItem("savedGames");
      if (existingData) {
        const existingGames = JSON.parse(existingData);

        let totalGames = 0;
        let wins = 0;
        let draws = 0;
        let losses = 0;

        existingGames.forEach((game) => {
          totalGames++;

          if (game.player === "WHITE" || game.player === "BLACK") {
            if (game.player === "WHITE") {
              wins++;
            } else {
              losses++;
            }
          } else {
            draws++;
          }
        });

        // Update playerStats state with fetched data
        setPlayerStats({
          totalGames: totalGames,
          wins: wins,
          draws: draws,
          losses: losses,
        });
      } else {
        // If no existing games found, set playerStats state to initial values
        setPlayerStats({
          totalGames: 0,
          wins: 0,
          draws: 0,
          losses: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching player stats: ", error);
    }
  };

  fetchPlayerStats();
  // }, []); // Empty dependency array ensures useEffect runs only once after component mounts

  return (
    <View style={styles.container}>
      <Header isProfile={true} />
      <View style={styles.subContainer}>
        <ChessPlayerStats {...playerStats} />
        <ChessboardStyles
          selectedStyle={selectedChessboard}
          onSelectStyle={handleChessboardChange}
        />

        {isGuest && <Play />}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  guestPlay: {
    // marginTop: '1%'
  },
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
