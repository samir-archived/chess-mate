// ChessContext.js
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Chess } from "chess.js";

const ChessContext = createContext();

function useConst(initialValue) {
  const ref = useRef();
  if (!ref.current) {
    ref.current = {
      value: typeof initialValue === "function" ? initialValue() : initialValue,
    };
  }
  return ref.current.value;
}

export const useChess = () => {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error("useChess must be used within a ChessProvider");
  }
  return context;
};
// Assuming you have a variable to store FEN
let fenHistory = [];

export const ChessProvider = ({ children }) => {
  const fenWithPromotion = "rnbqkbnr/pP6/8/8/8/8/1P6/RNBQKBNR b KQkq - 0 1";
  const chessRef = useConst(() => new Chess());
  // const chessRef = new Chess(fenWithPromotion);

  const [state, setState] = useState({
    player: "w",
    board: chessRef.board(),
    turn: 1,
    isGameFinished: false,
  });

  const onTurn = useCallback(() => {
    if (chessRef) {
      const currentTurn = chessRef.turn();
      setState((prevState) => ({
        player: currentTurn,
        board: chessRef.board(),
        turn: prevState.turn + 1,
        isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      }));
    }
  }, [chessRef]);

  const undoLastMove = () => {
    if (chessRef) {
      const moves = chessRef.history({ verbose: true });
      if (moves.length > 0) {
        const lastMove = chessRef.undo();
        if (lastMove) {
          const promotionSquare = lastMove.from;
          const promotedPiece = chessRef.get(promotionSquare);
          // Check if the last move was a promotion and revert it
          if (promotedPiece && promotedPiece.type === "q") {
            chessRef.put(
              { type: "p", color: chessRef.turn() },
              promotionSquare
            );
          }
        }

        // Store the undone move and current FEN for redo
        // const currentFen = chessRef.fen();
        // fenHistory.push({ move: lastMove, fen: currentFen });

        setState((prevState) => ({
          player: prevState.player === "w" ? "b" : "w",
          board: chessRef.board(),
          turn: prevState.turn - 1,
          isGameFinished: false,
        }));
      }
    }
  };

  const redoLastMove = () => {
    console.log(fenHistory.length);
    if (chessRef && fenHistory.length > 0) {
      const { move, fen } = fenHistory.pop();
      chessRef.load(fen); // Load the FEN to restore the board state
      chessRef.move(move); // Reapply the move

      setState((prevState) => ({
        player: chessRef.turn(),
        board: chessRef.board(),
        turn: prevState.turn + 1,
        isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      }));
    }
  };

  const saveGame = () => {
    if (chessRef) {
      const history = chessRef.history({ verbose: true });
      // Implement saving the game history as needed
      console.log("Game History:", history);
    }
  };

  const resetBoard = () => {
    if (chessRef) {
      chessRef.reset();
      setState({
        player: "w",
        board: chessRef.board(),
        turn: 1,
        isGameFinished: false,
      });
    }
  };

  const changeState = () => {
    if (chessRef) {
      const currentTurn = chessRef.turn();
      chessRef.turn();
      currentTurn = chessRef.turn();
      // setState((prevState) => ({
      //   player: currentTurn === "w" ? "b" : "w",
      //   // board: chessRef.board(),
      //   turn: prevState.turn + 1,
      //   isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      // }));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Implement your timer logic here
      // Ensure that chessRef is still defined if needed
    }, 1000);

    return () => clearInterval(timer);
  }, [chessRef]); // Include chessRef in the dependency array if needed

  return (
    <ChessContext.Provider
      value={{
        state,
        chessRef,
        onTurn,
        undoLastMove,
        redoLastMove,
        saveGame,
        resetBoard,
        changeState,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};
