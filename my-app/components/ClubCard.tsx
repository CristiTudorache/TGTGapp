import { View, Text, Pressable } from "react-native";

export default function ClubCard({ onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#1e293b",
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
      }}
    >
      <Text style={{ color: "#fbbf24", fontWeight: "bold" }}>
        👑 Premium
      </Text>

      <Text style={{ color: "white", fontSize: 16, marginTop: 4 }}>
        Intră în Club FoodLink
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 6 }}>
        Primești acces la oferte exclusive
      </Text>

      <View
        style={{
          marginTop: 10,
          backgroundColor: "#22c55e",
          padding: 10,
          borderRadius: 10,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white" }}>
          Intră pentru 10 lei/lună →
        </Text>
      </View>
    </Pressable>
  );
}