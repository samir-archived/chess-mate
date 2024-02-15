// MasterFile.jsx
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Chessboard from './Chessboard';
import Pieces from './Pieces';
import { SIZE } from './Notation';
import { useChess } from './ChessContext';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer:{
    top: height / 3 - width / 2, // Half box above center
  },
  middleContainer: {
    width,
    height: width,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const MasterFile = () => {
  const { state, onTurn, chessRef,undoLastMove, redoLastMove, saveGame } = useChess();
  const player = state.player === "w" ? "White" : "Black";
  const nxtPlayer = state.player === "w" ? "Black" : "White";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Turn: ${state.turn}`}</Text>
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
                />
              );
            }
            return null;
          })
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Game Status: ${
          chessRef.isDraw() ? `It's a draw`: chessRef.isCheckmate() ? `${nxtPlayer} Won //Game Finished//` : chessRef.inCheck() ? `${player} King is in Danger` : `In progress`
        }`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Next Player: ${nxtPlayer}`}</Text>
      </View>
    </View>
  );
};

export default MasterFile;
