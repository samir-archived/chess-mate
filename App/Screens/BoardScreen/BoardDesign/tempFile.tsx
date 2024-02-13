import { Chess } from "chess.js";
import React, { useCallback, useRef, useState, useEffect } from "react";// <---new
import { StyleSheet, View, Image, PanResponder, Animated, Dimensions, TouchableOpacity } from "react-native";//<--new
import { Vector } from "react-native-redash";

import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";


import {
    runOnJS,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { toTranslation, SIZE, toPosition, Position } from "./Notation";

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

interface PieceProps {
    id: Piece;
    startPosition: Vector;
    chess: Chess;
    onTurn: () => void;
    enabled: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
var chkPoint = false;
const Piece = ({ id, startPosition, chess, onTurn, enabled }: PieceProps) => {
    const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);
  const movePiece = useCallback(
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
  );

    console.log("++==>>", startPosition, translateX, translateY)
    // console.log(Math.floor(SCREEN_WIDTH / 8)) //49

    var pan = useState(new Animated.ValueXY())[0];
    pan.x.setValue(startPosition.x)
    pan.y.setValue(startPosition.y)

    const panResponder = useState(
        PanResponder.create({
            // onStartShouldSetPanResponder: ()=> true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: 
            // Animated.event([null, { dx: pan.x, dy: pan.y }]),
            (_, gesture) => {
                gesture.dx
                // console.log("Before",pan.x, pan.y)
                pan.x.setValue(gesture.dx)
                pan.y.setValue(gesture.dy)
                // console.log("After",pan.x, pan.y)
            },
            onPanResponderRelease: () => {
                // pan.extractOffset();
                pan.flattenOffset();
                // console.log("BREAK")
            },
        }),
    )[0];

    const singleTap = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log('Single tap!');
        });

    const doubleTap = Gesture.Tap()
        .maxDuration(250)
        .numberOfTaps(2)
        .onStart(() => {
            console.log('Double tap!');
        });

    // const tmpStyle = useAnimatedStyle(() => ({
    // position: "absolute",
    // zIndex: isGestureActive.value ? 100 : 10,
    // width: SIZE,
    // height: SIZE,
    // transform: [{ translateX: startPosition.x }, { translateY: startPosition.y },],
    //   }));

    // return (
    //     <GestureHandlerRootView style={{ position: "absolute", }}>
    //         <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
    //             {/* <Animated.View style={{}}>
    //         <Image source={PIECES[id]} style={styles.piece} />
    //       </Animated.View> */}
    //             <View style={styles.box} />
    //         </GestureDetector>
    //     </GestureHandlerRootView>
    // );
    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.container,
                    styles.piece,
                    { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                    // pan.getLayout()
                ]}
                {...panResponder.panHandlers}
            >
                <Image source={PIECES[id]} style={styles.piece} />
            </Animated.View>
        </View>
    );
};

export default Piece;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    piece: {
        width: SIZE,
        height: SIZE,
    },
    box: {
        height: 120,
        width: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginBottom: 30,
    },
});


