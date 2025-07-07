import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { useRewards } from "../context/RewardsContext";
import uuid from "react-native-uuid";
import Header from "../components/shared/Header";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ShowRewards from "../components/admin/ShowRewards";
import ShowCodes from "../components/admin/ShowCodes";

export default function AdminScreen() {
  const [selectedTab, setSelectedTab] = useState<"rewards" | "codes">(
    "rewards"
  );

  return (
    <>
      <Header
        title="Panel Administrativo"
        subtitle="Gestiona recompensas y códigos"
        showPoints={false}
      />
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "rewards" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("rewards")}
        >
          <View style={{ flexDirection: "row", gap: 5 }}>
            <MaterialIcons
              name="card-giftcard"
              size={14}
              color={selectedTab === "rewards" ? "red" : "#888"}
            />
            <Text
              style={
                selectedTab === "rewards"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              Recompensas
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "codes" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("codes")}
        >
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons
              name="settings"
              size={14}
              color={selectedTab === "codes" ? "red" : "#888"}
            />
            <Text
              style={
                selectedTab === "codes" ? styles.activeTabText : styles.tabText
              }
            >
              Códigos
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {selectedTab === "rewards" ? <ShowRewards /> : <ShowCodes />}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  tabs: { flexDirection: "row", marginBottom: 16 },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  activeTab: {
    borderBottomColor: "#e63946",
  },
  tabText: { color: "#888", fontWeight: "bold" },
  activeTabText: { color: "#e63946", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#e63946",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "white", fontWeight: "bold" },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  deleteBtn: {
    marginTop: 8,
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  useBtn: {
    marginTop: 8,
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 10,
  },
  statusActive: {
    backgroundColor: "#4caf50",
  },
  statusInactive: {
    backgroundColor: "#f44336",
  },
  modalBtnsRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  addBtn: {
    backgroundColor: "#e63946",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  cancelBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#e63946",
  },
});
