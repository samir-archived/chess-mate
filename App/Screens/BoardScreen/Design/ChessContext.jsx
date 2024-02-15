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
  if (ref.current === undefined) {
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

export const ChessProvider = ({ children }) => {
  const chessRef = useConst(() => new Chess());
  chessRef.i;
  const [state, setState] = useState({
    player: "w",
    board: chessRef.board(),
    turn: 1,
    isGameFinished: false,
  });

  const onTurn = useCallback(() => {
    const currentTurn = chessRef.turn();
    setState((prevState) => ({
      player: currentTurn,
      board: chessRef.board(),
      turn: prevState.turn + 1,
      isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
    }));
  }, [chessRef]);

  const undoLastMove = () => {
    chessRef.undo();
    setState((prevState) => ({
      player: prevState.player === "w" ? "b" : "w",
      board: chessRef.board(),
      turn: prevState.turn - 1,
      isGameFinished: false,
    }));
  };

  const redoLastMove = () => {
    const moves = chessRef.history({ verbose: true });
    if (moves.length > 0) {
      chessRef.move(moves[moves.length - 1]);
      setState((prevState) => ({
        player: chessRef.turn(),
        board: chessRef.board(),
        turn: prevState.turn + 1,
        isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      }));
    }
  };

  const saveGame = () => {
    const history = chessRef.history({ verbose: true });
    // Implement saving the game history as needed
    console.log("Game History:", history);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Implement your timer logic here
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ChessContext.Provider
      value={{ state, chessRef, onTurn, undoLastMove, redoLastMove, saveGame }}
    >
      {children}
    </ChessContext.Provider>
  );
};
