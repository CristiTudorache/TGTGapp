import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Club() {
  const router = useRouter();

  const deals = [
    { id: "1", title: "Sushi Premium", price: "29.99 RON" },
    { id: "2", title: "Mic Dejun Deluxe", price: "19.99 RON" },
    { id: "3", title: "Box Vegan", price: "22.00 RON" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 16 }}>
      <Pressable onPress={() => router.back()}>
        <Text style={{ color: "#22c55e", marginBottom: 20 }}>
          ← Înapoi
        </Text>
      </Pressable>

      <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
        Club FoodLink 👑
      </Text>

      <ScrollView>
        {deals.map((d) => (
          <View
            key={d.id}
            style={{
              backgroundColor: "#1e293b",
              padding: 16,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>{d.title}</Text>
            <Text style={{ color: "#22c55e" }}>{d.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}