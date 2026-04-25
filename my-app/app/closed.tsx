import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function ClosedScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 22 }}>
        Închis
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 6 }}>
        Revino mâine
      </Text>

      <Pressable
        onPress={() => router.back()}
        style={{
          marginTop: 20,
          backgroundColor: "#22c55e",
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>Back</Text>
      </Pressable>
    </View>
  );
}