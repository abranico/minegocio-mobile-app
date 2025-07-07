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
import { Reward } from "../../types";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";

export default function ShowRewards() {
  const { rewards, addReward, removeReward, editReward } = useRewards();
  const [addRewardModal, setAddRewardModal] = useState(false);
  const activeRewards = rewards.filter((reward) => reward.status);
  const ordenatedRewards = [...rewards].sort(
    (a, b) => Number(b.status) - Number(a.status)
  );

  const handleAddReward = (newReward: Reward) => {
    if (newReward.title.trim() === "") return;
    if (newReward.points <= 0) return;
    addReward(newReward);
    setAddRewardModal(false);
  };

  const handleDelete = (id: string) => {
    removeReward(id);
  };

  const handleEdit = (reward: Reward) => {
    if (reward.title.trim() === "") return;
    if (reward.points <= 0) return;
    editReward(reward);
  };

  if (rewards.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes recompensas creadas</Text>
        <TouchableOpacity
          onPress={() => setAddRewardModal(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Crear Recompensa</Text>
        </TouchableOpacity>
        {addRewardModal && (
          <AddReward
            onClose={() => setAddRewardModal(false)}
            modalState={addRewardModal}
            handleAddReward={handleAddReward}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.rewardsCount}>
          {activeRewards.length} / {rewards.length} Recompensas disponibles
        </Text>
        <TouchableOpacity
          onPress={() => setAddRewardModal(true)}
          style={styles.addRewardBtn}
        >
          <Text style={styles.addRewardText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={ordenatedRewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RewardItem
            reward={item}
            admin={true}
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
      {addRewardModal && (
        <AddReward
          onClose={() => setAddRewardModal(false)}
          modalState={addRewardModal}
          handleAddReward={handleAddReward}
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
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 16,
  },
  rewardsHeader: {
    backgroundColor: "#fff8e1",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rewardsCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  addRewardBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e63946",
  },

  addRewardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
