import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Reward } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { usePoints } from "../../context/PointsContext";
import { useState } from "react";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
import EditReward from "../admin/reward/EditReward";

interface Props {
  reward: Reward;
  admin?: boolean;
  handleDelete?: (id: string) => void;
  handleEdit?: (reward: Reward) => void;
}

export default function RewardItem({
  reward,
  admin = false,
  handleDelete,
  handleEdit,
}: Props) {
  const { points, deductPoints } = usePoints();
  const [deleteRewardModal, setDeleteRewardModal] = useState(false);
  const [editRewardModal, setEditRewardModal] = useState(false);
  const isRedeemable = points >= reward.points || (admin && reward.status);

  const handleRedeem = () => {
    deductPoints(reward.points);
    alert("Recomensa canjeada!");
  };

  return (
    <View style={[styles.card, !isRedeemable && styles.cardDisabled]}>
      <Text style={[styles.title, !isRedeemable && styles.titleDisabled]}>
        {reward.title}
      </Text>
      <Text
        style={[
          styles.description,
          !isRedeemable && styles.descriptionDisabled,
        ]}
      >
        {reward.description}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.points, !isRedeemable && styles.pointsDisabled]}>
          <AntDesign
            name="star"
            size={14}
            color={isRedeemable ? "gold" : "#ccc"}
          />
          <Text
            style={[
              styles.pointsText,
              !isRedeemable && styles.pointsTextDisabled,
            ]}
          >
            {reward.points} pts
          </Text>
        </View>
        {!admin ? (
          <TouchableOpacity
            style={[styles.button, !isRedeemable && styles.buttonDisabled]}
            disabled={!isRedeemable}
            onPress={handleRedeem}
          >
            <Text style={styles.buttonText}>Canjear</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity
              onPress={() => setEditRewardModal(true)}
              style={[styles.button, styles.editButton]}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeleteRewardModal(true)}
              style={[styles.button, styles.deleteButton]}
            >
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {handleDelete && (
        <ConfirmDeleteModal
          visible={deleteRewardModal}
          onConfirm={handleDelete}
          onCancel={() => setDeleteRewardModal(false)}
          itemName={reward.title}
          itemId={reward.id}
        />
      )}
      {handleEdit && (
        <EditReward
          modalState={editRewardModal}
          handleEditReward={handleEdit}
          onClose={() => setEditRewardModal(false)}
          reward={reward}
        />
      )}
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
