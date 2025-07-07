import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: (id: string) => void;
  onCancel: () => void;
  itemName?: string;
  itemId: string;
}

export default function ConfirmDeleteModal({
  visible,
  onConfirm,
  onCancel,
  itemName,
  itemId,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Confirmar Eliminación</Text>
          <Text style={styles.message}>
            ¿Estás seguro de que quieres eliminar{" "}
            <Text style={{ fontWeight: "bold" }}>
              {itemName || "este ítem"}
            </Text>
            {"?"}
          </Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onConfirm(itemId)}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  deleteBtn: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#e63946",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
