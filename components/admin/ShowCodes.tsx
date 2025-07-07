import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRewards } from "../../context/RewardsContext";
import RewardItem from "../rewards/RewardItem";
import AddReward from "./reward/AddReward";
import { Code, Reward } from "../../types";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
import AddCode from "./codes/AddCode";
import CodeItem from "./codes/CodeItem";

export default function ShowCodes() {
  const { codes, addCode, removeCode, editCode } = useRewards();
  const [addCodeModal, setAddCodeModal] = useState(false);
  const usedCodes = codes.filter((code) => !code.used);
  const ordenatedCodes = [...codes].sort(
    (a, b) => Number(a.used) - Number(b.used)
  );

  const handleAddCode = (newCode: Code) => {
    if (newCode.code.trim() === "") return;
    if (newCode.points <= 0) return;
    addCode(newCode);
    setAddCodeModal(false);
  };

  const handleDelete = (id: string) => {
    removeCode(id);
  };

  const handleEdit = (code: Code) => {
    if (code.code.trim() === "") return;
    if (code.points <= 0) return;
    editCode(code);
  };

  if (codes.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes codigos creados</Text>
        <TouchableOpacity
          onPress={() => setAddCodeModal(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Crear Código</Text>
        </TouchableOpacity>
        {addCodeModal && (
          <AddCode
            onClose={() => setAddCodeModal(false)}
            modalState={addCodeModal}
            handleAddCode={handleAddCode}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.rewardsText}>
          {usedCodes.length} / {codes.length} Códigos disponibles
        </Text>
        <TouchableOpacity
          onPress={() => setAddCodeModal(true)}
          style={styles.addCodeBtn}
        >
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={ordenatedCodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CodeItem
            code={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
        contentContainerStyle={{
          gap: 20,
          paddingRight: 20,
          paddingTop: 30,
          paddingBottom: 170,
        }}
      />
      {addCodeModal && (
        <AddCode
          onClose={() => setAddCodeModal(false)}
          modalState={addCodeModal}
          handleAddCode={handleAddCode}
        />
      )}
      ;
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rewardsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center", // centra verticalmente
    alignItems: "center", // centra horizontalmente
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#e63946",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  addCodeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e63946",
  },
});
