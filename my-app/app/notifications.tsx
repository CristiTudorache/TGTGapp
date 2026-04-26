import { View, Text, ScrollView, Pressable } from "react-native";
import { useApp } from "../context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";

export default function Notifications() {
  const { notifications, markAllRead } = useApp();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        <BackButton />

        <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
          Notificări
        </Text>

        <Pressable
          onPress={markAllRead}
          style={{ marginBottom: 20 }}
        >
          <Text style={{ color: "#22c55e" }}>
            Marchează ca citite
          </Text>
        </Pressable>

        {notifications.map((n) => (
          <View
            key={n.id}
            style={{
              backgroundColor: "#1e293b",
              padding: 14,
              borderRadius: 10,
              marginBottom: 10,
              borderLeftWidth: 4,
              borderLeftColor: n.read ? "#334155" : "#22c55e",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {n.title}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              {n.message}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}