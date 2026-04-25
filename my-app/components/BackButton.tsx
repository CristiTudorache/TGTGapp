import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.back()}
      style={{ marginBottom: 10 }}
    >
      <Text style={{ color: "#22c55e", fontSize: 16 }}>
        ← Înapoi
      </Text>
    </Pressable>
  );
}