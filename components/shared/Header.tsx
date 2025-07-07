import { Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePoints } from "../../context/PointsContext";

interface Props {
  title: string;
  subtitle: string;
  showPoints?: boolean;
}

export default function Header({ title, subtitle, showPoints = true }: Props) {
  const insets = useSafeAreaInsets();
  const { points } = usePoints();
  return (
    <View style={{ ...styles.header, paddingTop: insets.top }}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      {showPoints && (
        <View style={styles.headerPoints}>
          <AntDesign name="star" size={18} color="gold" />
          <Text style={styles.pointsLabel}>{points} pts</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 135,
    backgroundColor: "white",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  headerSubtitle: {
    color: "#6f6f6f",
    fontSize: 15,
  },
  headerPoints: {
    flexDirection: "row",
    backgroundColor: "#fef3c7",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  pointsLabel: {
    fontSize: 18,
  },
});
