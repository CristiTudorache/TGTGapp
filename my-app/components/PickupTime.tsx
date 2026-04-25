import { Text, View } from "react-native";

export default function PickupTime({ start, end }: any) {
  if (!start || !end) return null;

  return (
    <View style={{ marginTop: 4 }}>
      <Text style={{ color: "#94a3b8", fontSize: 12 }}>
        📅 {start}:00 - {end}:00
      </Text>
    </View>
  );
}