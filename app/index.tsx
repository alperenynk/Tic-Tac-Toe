import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const initialBoard = Array(9).fill(null);

export default function Index() {
  const [board, setBoard] = useState<(null | "X" | "O")[]>(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [winner, setWinner] = useState<null | "X" | "O" | "draw">(null);
  const [winningCells, setWinningCells] = useState<number[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const animations = useRef<Animated.Value[]>(
    Array(9)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;

  const handlePress = (index: number) => {
    if (board[index] !== null || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    Animated.timing(animations[index], {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningCells(result.line);
      setIsModalVisible(true);
      if (result.winner === "X") setXScore((prev) => prev + 1);
      else if (result.winner === "O") setOScore((prev) => prev + 1);
    } else if (!newBoard.includes(null)) {
      setWinner("draw");
      setWinningCells([]);
      setIsModalVisible(true);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
    setWinningCells([]);
    setIsModalVisible(false);

    // Reset animations
    animations.forEach((anim) => anim.setValue(0));
  };

  const resetAll = () => {
    resetGame();
    setXScore(0);
    setOScore(0);
  };

  const checkWinner = (
    b: (null | "X" | "O")[]
  ): { winner: "X" | "O"; line: number[] } | null => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winPatterns) {
      const [a, bIndex, c] = line;
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) {
        return { winner: b[a], line };
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {winner === "draw"
                ? "🤝 Draw!"
                : winner === "X"
                ? "❌ Wins!"
                : "⭕ Wins!"}
            </Text>
            <Pressable style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.modalButtonText}>🔁 Restart The Game</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>❌: {xScore}</Text>
        <Text style={styles.scoreText}>⭕: {oScore}</Text>
      </View>

      <Text style={styles.turnText}>Turn: {isXTurn ? "❌" : "⭕"}</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <Pressable
            key={index}
            style={[
              styles.cell,
              winningCells.includes(index) && styles.winningCell, 
            ]}
            onPress={() => handlePress(index)}
          >
            <Animated.Text
              style={[
                styles.cellText,
                { opacity: animations[index] },
              ]}
            >
              {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""}
            </Animated.Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetButtonText}>🔄 Reset Score</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  
  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  
  turnText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    borderColor: "#fff",
  },
  
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
  },
  
  winningCell: {
    backgroundColor: "#4CAF50",
  },
  
  cellText: {
    fontSize: 40,
    color: "#fff",
  },
  
  resetButton: {
    marginTop: 20,
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#202020",
  },
  
  modalButton: {
    backgroundColor: "#202020",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});