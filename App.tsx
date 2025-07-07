import { View } from "react-native";
import Home from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PointsProvider } from "./context/PointsContext";
import { RewardsProvider } from "./context/RewardsContext";
import TabBar from "./components/shared/TabBar";

export default function App() {
  return (
    <PointsProvider>
      <RewardsProvider>
        <SafeAreaProvider>
          <TabBar />
        </SafeAreaProvider>
      </RewardsProvider>
    </PointsProvider>
  );
}
