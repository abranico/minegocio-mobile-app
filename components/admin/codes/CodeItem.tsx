import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Code } from "../../../types";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal";
import EditCode from "./EditCode";

interface Props {
  code: Code;
  handleDelete: (id: string) => void;
  handleEdit: (code: Code) => void;
}

export default function CodeItem({ code, handleDelete, handleEdit }: Props) {
  const [deleteCodeModal, setDeleteCodeModal] = useState(false);
  const [editCodeModal, setEditCodeModal] = useState(false);

  return (
    <View style={[styles.card, code.used && styles.cardDisabled]}>
      <Text style={[styles.title, code.used && styles.titleDisabled]}>
        {code.code}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.points, code.used && styles.pointsDisabled]}>
          <AntDesign
            name="star"
            size={14}
            color={!code.used ? "gold" : "#ccc"}
          />
          <Text
            style={[styles.pointsText, code.used && styles.pointsTextDisabled]}
          >
            {code.points} pts
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity
            onPress={() => {
              setEditCodeModal(true);
            }}
            style={[styles.button, styles.editButton]}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeleteCodeModal(true)}
            style={[styles.button, styles.deleteButton]}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmDeleteModal
        visible={deleteCodeModal}
        onConfirm={handleDelete}
        onCancel={() => setDeleteCodeModal(false)}
        itemName={code.code}
        itemId={code.id}
      />
      <EditCode
        modalState={editCodeModal}
        handleEditCode={handleEdit}
        onClose={() => setEditCodeModal(false)}
        code={code}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  cardDisabled: {
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  titleDisabled: {
    color: "#999",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  descriptionDisabled: {
    color: "#aaa",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    flexDirection: "row",
    backgroundColor: "#fef3c7",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  pointsText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  pointsDisabled: {
    opacity: 0.6,
  },
  pointsTextDisabled: {
    color: "#999",
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  editButton: {
    backgroundColor: "#f3f4f6", // gris
  },
  deleteButton: {
    backgroundColor: "#fef2f2", // rojo
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
