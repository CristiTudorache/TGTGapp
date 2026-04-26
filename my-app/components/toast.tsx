import { View, Text } from "react-native";

export default function Toast({ title, message }: any) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 12,
        zIndex: 9999, // 🔥 IMPORTANT
        elevation: 10, // Android fix
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>
        {title}
      </Text>

      <Text style={{ color: "white" }}>
        {message}
      </Text>
    </View>
  );
}