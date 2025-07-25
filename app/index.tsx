import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const initialBoard = Array(9).fill(null);

export default function Index() {
  const [board, setBoard] = useState<(null | "X" | "O")[]>(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [winner, setWinner] = useState<null | "X" | "O" | "draw">(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = (index: number) => {
    if (board[index] !== null || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setIsModalVisible(true);
      if (result === "X") setXScore((prev) => prev + 1);
      else if (result === "O") setOScore((prev) => prev + 1);
    } else if (!newBoard.includes(null)) {
      setWinner("draw");
      setIsModalVisible(true);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
    setIsModalVisible(false);
  };

  const resetAll = () => {
    resetGame();
    setXScore(0);
    setOScore(0);
  };

  const checkWinner = (b: (null | "X" | "O")[]): "X" | "O" | null => {
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

    for (const [a, bIndex, c] of winPatterns) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Modal */}
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
                ? "🤝 Beraberlik!"
                : winner === "X"
                ? "❌ Kazandı!"
                : "⭕ Kazandı!"}
            </Text>
            <Pressable style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.modalButtonText}>🔁 Oyunu Yeniden Başlat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Skor Tablosu */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>❌: {xScore}</Text>
        <Text style={styles.scoreText}>⭕: {oScore}</Text>
      </View>

      <Text style={styles.turnText}>Turn: {isXTurn ? "❌" : "⭕"}</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <Pressable
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>
              {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetButtonText}>🔄 Skoru ve Oyunu Sıfırla</Text>
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
