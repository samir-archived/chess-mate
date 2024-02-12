import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";// <---new
import { StyleSheet, Text, Image, Animated, Dimensions } from "react-native";//<--new
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
const Piece = ({ id, startPosition, chess, onTurn, enabled }: PieceProps) => {

    const size = 8;

    const isGestureActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const translateX = useSharedValue(startPosition.x * size);
    const translateY = useSharedValue(startPosition.y * size);

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


    const gesture = Gesture.Pan()
        .onBegin(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        })
        .onStart(() => {
            if (!isGestureActive.value) return;
            isGestureActive.value = true;
        })
        .onUpdate(({ translationX, translationY }) => {
            if (!isGestureActive.value) return;
            translateX.value = offsetX.value + translationX;
            translateY.value = offsetY.value + translationY;
        })
        .onEnd(() => {
            if (!isGestureActive.value) return;
            runOnJS(movePiece)(
                toPosition({ x: translateX.value, y: translateY.value })
            );
        })
        .onFinalize(() => {
            // scale.value = withTiming(1);
        });

    // const style = useAnimatedStyle(() => ({
    //     position: 'absolute',
    //     zIndex: isGestureActive.value ? 100 : 10,
    //     transform: [
    //         { translateX: translateX.value },
    //         { translateY: translateY.value },
    //         { scale: scale.value },
    //     ],
    // }));

    return (
        <>
            {/* <Animated.View style={{}} /> */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.container]}>
                    <Image source={PIECES[id]} style={styles.piece} />
                </Animated.View>
            </GestureDetector>
        </>
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


