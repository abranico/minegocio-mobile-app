import { Text, StyleSheet, View, FlatList } from "react-native";
import Header from "../components/shared/Header";
import { useState } from "react";
import { Reward } from "../types";
import RewardItem from "../components/rewards/RewardItem";
import { useRewards } from "../context/RewardsContext";

export default function Rewards() {
  const { rewards } = useRewards();
  const filteredRewards = rewards.filter((reward) => reward.status);
  const orderedRewards = [...filteredRewards]?.sort(
    (a, b) => a.points - b.points
  );
  return (
    <>
      <Header title="Recompensas" subtitle="Canjea tus puntos por premios" />
      <View style={styles.container}>
        {orderedRewards.length > 0 ? (
          <FlatList
            data={orderedRewards}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RewardItem reward={item} />}
            contentContainerStyle={{
              gap: 20,
              paddingRight: 20,
              paddingTop: 30,

              paddingBottom: 170,
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay recompensas disponibles.
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
  },
});
