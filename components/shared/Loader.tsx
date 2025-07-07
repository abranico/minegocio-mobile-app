import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#e63946" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
});
