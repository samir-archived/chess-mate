import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { toTranslation, SIZE, toPosition } from "./Notation";
import { useChess } from "./ChessContext";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

const PIECES = {
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
// ... (import statements)

const Pieces = ({ key, id, startPosition, chess, onTurn, enabled }) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x);
  const translateY = useSharedValue(startPosition.y);

  const movePiece = useCallback(
    (to, switchTurn) => {
      try {
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
          // Check for pawn promotion
          const promotionRank = chess.turn() === "w" ? 8 : 1;
          console.log(move.flags, move.to, move.from, promotionRank);

          // Check for capturing and promoting on the 8th rank (cp flag)
          if (
            (move.flags.includes("cp") &&
              parseInt(move.to[1]) === promotionRank) ||
            ((move.flags.includes("c") || move.flags.includes("p")) &&
              parseInt(to[1]) === promotionRank)
          ) {
            // Handle capturing and promoting
            chess.remove(move.from);
            chess.remove(move.to);
            chess.put({ type: "q", color: chess.turn() }, move.from);
          }
          chess.move({ from, to });
          switchTurn();
        }
      } catch (err) {
        console.log("Error:", err);
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = offsetX.value + translationX;
      translateY.value = offsetY.value + translationY;
    },
    onEnd: () => {
      runOnJS(movePiece)(
        toPosition({ x: translateX.value, y: translateY.value }),
        onTurn
      );
    },
  });

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const original = useAnimatedStyle(() => ({
    position: "absolute",
    width: SIZE,
    height: SIZE,
    zIndex: 0,
    backgroundColor: isGestureActive.value
      ? "rgba(255, 255, 0, 0.5)"
      : "transparent",
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  const underlay = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });

  return (
    <>
      <Animated.View style={original} />
      <Animated.View style={underlay} />
      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={style}>
          <Image key={key} source={PIECES[id]} style={styles.piece} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Pieces;
