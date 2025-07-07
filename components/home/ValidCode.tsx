import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useRewards } from "../../context/RewardsContext";
import { usePoints } from "../../context/PointsContext";

export default function ValidCode() {
  const { markCodeUsed } = useRewards();
  const { addPoints } = usePoints();
  const [codeInput, setCodeInput] = useState("");

  const handleValidate = async () => {
    if (codeInput.trim() === "") return;
    const code = await markCodeUsed(codeInput);
    if (!code) return alert("Codigo incorrecto");
    setCodeInput("");
    addPoints(code.points);
    alert("Código canjeado correctamente.");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Ingresa tu código</Text>
          <Text style={styles.subtitle}>
            Introduce el código que recibiste en tu compra presencial y suma
            puntos
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            value={codeInput}
            onChangeText={(text) => setCodeInput(text)}
            placeholder="Ej: AJCV65"
            style={styles.input}
            autoCapitalize="characters"
          />

          <TouchableOpacity style={styles.button} onPress={handleValidate}>
            <MaterialIcons name="local-offer" size={18} color="#fff" />
            <Text style={styles.buttonText}>Validar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            <Text style={styles.tipLabel}>¡Tip! </Text>
            Los códigos los encontrás en tu ticket de compra.
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  header: {
    gap: 8,
    backgroundColor: "#ef4444",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 15,
    color: "#DFE2E5",
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    width: "60%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  tipContainer: {
    backgroundColor: "#fff9c4",
    borderLeftWidth: 4,
    borderLeftColor: "#fbc02d",
    padding: 12,
    marginTop: 16,
  },
  tipText: {
    fontSize: 13,
    color: "#444",
  },
  tipLabel: {
    fontWeight: "700",
    color: "#333",
  },
});
