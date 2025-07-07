import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Reward } from "../../../types";
import uuid from "react-native-uuid";

interface Props {
  onClose: () => void;
  modalState: boolean;
  handleAddReward: (newReward: Reward) => void;
}

export default function AddReward({
  onClose,
  modalState,
  handleAddReward,
}: Props) {
  const [newRewardValue, setNewReward] = useState<Reward>({
    id: uuid.v4(),
    title: "",
    description: "",
    points: 100,
    status: true,
  });

  const handleChange = (
    key: keyof Reward,
    value: string | number | boolean
  ) => {
    setNewReward((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Modal
      visible={modalState}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Recompensa</Text>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                value={newRewardValue.title}
                onChangeText={(text) => handleChange("title", text)}
              />
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.input}
                value={newRewardValue.description}
                onChangeText={(text) => handleChange("description", text)}
              />
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.label}>Puntos</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={newRewardValue.points.toString()}
                onChangeText={(text) =>
                  handleChange("points", parseInt(text) || 0)
                }
              />
            </View>

            <View style={styles.statusRow}>
              <Text>Activo:</Text>
              <TouchableOpacity
                onPress={() => handleChange("status", !newRewardValue.status)}
                style={[
                  styles.statusBtn,
                  newRewardValue.status
                    ? styles.statusActive
                    : styles.statusInactive,
                ]}
              >
                <Text style={{ color: "white" }}>
                  {newRewardValue.status ? "Sí" : "No"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBtnsRow}>
              <TouchableOpacity
                onPress={() => handleAddReward(newRewardValue)}
                style={styles.addBtn}
              >
                <Text style={{ color: "white" }}>Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                <Text style={{ color: "#e63946" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // fondo semitransparente
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusBtn: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: "#4caf50",
  },
  statusInactive: {
    backgroundColor: "#f44336",
  },
  modalBtnsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addBtn: {
    backgroundColor: "#e63946",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#e63946",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 14,
  },
});
