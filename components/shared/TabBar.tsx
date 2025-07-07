import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../../screens/HomeScreen";
import AdminScreen from "../../screens/AdminScreen";
import RewardsScreen from "../../screens/RewardsScreen";
import { Text, View } from "react-native";

export default function TabBar() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#e63946",
          tabBarInactiveTintColor: "#aaa",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Recompensas"
          component={RewardsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="card-giftcard" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
