// MasterFile.jsx
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Chessboard from "./Chessboard";
import Pieces from "./Pieces";
import { SIZE } from "./Notation";
import { useChess } from "./ChessContext";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Chess } from "chess.js";
// import { ChessProvider } from './ChessContext';
import Timer from "./Timer";
import HandleVibration from "../../../Components/HandleVibration";
import ModalComponent from "../../../Components/ModalComponent";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    top: height / 3 - width / 2, // Half box above center
  },
  middleContainer: {
    width,
    height: width,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
});

const MasterFile = () => {
  const {
    state,
    onTurn,
    chessRef,
    resetBoard,
    setPos,
    undoLastMove,
    redoLastMove,
    saveGame,
  } = useChess();
  const player = state.player === "w" ? "White" : "Black";
  const nxtPlayer = state.player === "w" ? "Black" : "White";
  const [isModalVisible, setModalVisible] = useState(false);

  const [gameStatus, setGameStatus] = useState(null);

  const setTimerValue = 10;

  //==>> Timer Reference <==//
  const timerRef = useRef();
  const handlePause = () => {
    timerRef.current.pause();
  };

  const handleReset = () => {
    timerRef.current.reset();
  };

  const onSaveGame = () => {
    saveGame();
    resetBoard();
    handleReset();
    handlePause();
  };
  const onCancelGame = () => {
    resetBoard();
    handleReset();
    handlePause();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Turn: ${state.turn}`}</Text>
        <Timer limitInMinutes={setTimerValue} ref={timerRef} />
        <Text style={styles.infoText}>{`Player: ${player}`}</Text>
      </View>
      <View style={styles.middleContainer}>
        <Chessboard />
        {state.board.map((row, y) =>
          row.map((piece, x) => {
            if (piece !== null) {
              return (
                <Pieces
                  key={`${x}-${y}`}
                  id={`${piece.color}${piece.type}`}
                  startPosition={{ x: x * SIZE, y: y * SIZE }}
                  chess={chessRef}
                  onTurn={onTurn}
                  enabled={state.player === piece.color}
                  setGameStatus={setGameStatus}
                  setModalVisible={setModalVisible}
                />
              );
            }
            return null;
          })
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{`Game Status: ${
            gameStatus != "Success"
              ? gameStatus
              : chessRef.isDraw()
              ? `It's a draw`
              : chessRef.isCheckmate()
              ? `${nxtPlayer} Won //Game Finished//`
              : chessRef.inCheck()
              ? `${player} King is in Danger`
              : `In progress`
          }`}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Next Player: ${nxtPlayer}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={undoLastMove}>
        <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancelGame}>
          <MaterialIcons name="restart-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ModalComponent
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onSaveGame={onSaveGame}
        onCancelGame={onCancelGame}
      />
    </View>
  );
};

export default MasterFile;
