import {
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Chessboard from "./Chessboard";
import Piece from "./Piece";
import { Chess } from "chess.js";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const SIZE = width / 8;

const hh = require("../../../assets/pieces/br.png");
const images = [
  { key: "br", uri: require("../../../assets/pieces/br.png") },
  { key: "bp", uri: require("../../../assets/pieces/bp.png") },
  { key: "bn", uri: require("../../../assets/pieces/bn.png") },
  { key: "bb", uri: require("../../../assets/pieces/bb.png") },
  { key: "bq", uri: require("../../../assets/pieces/bq.png") },
  { key: "bk", uri: require("../../../assets/pieces/bk.png") },
  { key: "wr", uri: require("../../../assets/pieces/wr.png") },
  { key: "wn", uri: require("../../../assets/pieces/wn.png") },
  { key: "wb", uri: require("../../../assets/pieces/wb.png") },
  { key: "wq", uri: require("../../../assets/pieces/wq.png") },
  { key: "wk", uri: require("../../../assets/pieces/wk.png") },
  { key: "wp", uri: require("../../../assets/pieces/wp.png") },
];
function getPieceType(row, col) {
  if (row === 1) {
    // Black Pawns
    return "bp";
  } else if (row === 6) {
    // White Pawns
    return "wp";
  } else {
    // Determine piece type based on starting positions and rules
    switch (col) {
      case 0: // Rook
        return row === 0 ? "br" : row === 7 ? "wr" : null;
      case 1: // Knight
        return row === 0 ? "bn" : row === 7 ? "wn" : null;
      case 2: // Bishop
        return row === 0 ? "bb" : row === 7 ? "wb" : null;
      case 3: // Queen
        return row === 0 ? "bq" : row === 7 ? "wq" : null;
      case 4: // King
        return row === 0 ? "bk" : row === 7 ? "wk" : null;
      case 5: // Bishop
        return row === 0 ? "bb" : row === 7 ? "wb" : null;
      case 6: // Knight
        return row === 0 ? "bn" : row === 7 ? "wn" : null;
      case 7: // Rook
        return row === 0 ? "br" : row === 7 ? "wr" : null;
      default: // Empty square
        return null;
    }
  }
}

function useConst(initialValue) {
  const ref = useRef();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
          initialValue()
          : initialValue,
    };
  }
  return ref.current.value;
}

export default function MasterFile() {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });
  const onTurn = useCallback(() => {
    setState((prevState) => ({
      player: prevState.player === "w" ? "b" : "w",
      board: chess.board(),
    }));
  }, [chess]);

  return (
    // <View style={styles.mainContainer}>
    <View style={styles.container}>
      <Chessboard />
      {/* {new Array(8).fill(0).map((_, i) =>
        new Array(8).fill(0).map((_, j) => { */}
      {state.board.map((row, i) =>
        row.map((piece, j) => {
          if (piece === null) return null;
          const pieceType = getPieceType(i, j);
          const pieceImage = images.find((piece) => piece.key === pieceType);
          return (
            pieceType && (
              <Piece
                key={`${i}${j}`}
                xCoordinate={j * SIZE}
                yCoordinate={i * SIZE}
                imgUri={pieceImage.uri}
                chess={chess}
                onTurn={onTurn}
                enabled={state.player === piece.color}
              />
            )
          );
        })
      )}
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: height / 2.6 - width / 2, // Half box above center
    height: width,
    width: width,
  },
  piece: {
    height: SIZE,
    width: SIZE,
  },
});
