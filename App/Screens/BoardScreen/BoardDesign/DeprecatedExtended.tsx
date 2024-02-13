import { Chess, Position } from "chess.js";
import { useCallback } from "react";
import { Image, StyleSheet } from "react-native";
import { Vector } from "react-native-redash";
import { toTranslation, SIZE, toPosition } from "./Notation";
import { withTiming } from "react-native-reanimated";

type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: require("../../../../assets/pieces/br.png"),
  bp: require("../../../../assets/pieces/bp.png"),
  bn: require("../../../../assets/pieces/bn.png"),
  bb: require("../../../../assets/pieces/bb.png"),
  bq: require("../../../../assets/pieces/bq.png"),
  bk: require("../../../../assets/pieces/bk.png"),
  wr: require("../../../../assets/pieces/wr.png"),
  wn: require("../../../../assets/pieces/wn.png"),
  wb: require("../../../../assets/pieces/wb.png"),
  wq: require("../../../../assets/pieces/wq.png"),
  wk: require("../../../../assets/pieces/wk.png"),
  wp: require("../../../../assets/pieces/wp.png"),
};

export interface PieceProps {
  id: Piece;
  startPosition: Vector;
  chess: Chess;
  onTurn: () => void;
  enabled: boolean;
}

export const movePiece = (chess, translateX, translateY, offsetX, offsetY, isGestureActive, onTurn) => {useCallback(
    (to: Position) => {
      const moves = chess.moves({ verbose: true });
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const move = moves.find((m) => m.from === from && m.to === to);
      const { x, y } = toTranslation(move ? move.to : from);
      translateX.value = withTiming(
        x,
        {},
        () => (offsetX.value = translateX.value)
      );
      translateY.value = withTiming(y, {}, () => {
        offsetY.value = translateY.value;
        isGestureActive.value = false;
      });
      if (move) {
        chess.move({ from, to });
        onTurn();
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );}

  export const PieceImage = (id) => {
    return (<Image source={PIECES[id]} style={styles.piece} />);
  }

  const styles = StyleSheet.create({
    piece: {
      width: SIZE,
      height: SIZE,
    },
  });