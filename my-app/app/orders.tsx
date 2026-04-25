import { View, Text, ScrollView } from "react-native";
import { useApp } from "../context/AppContext";

export default function Orders() {
  const { orders } = useApp();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0f172a", padding: 16 }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
        Comenzi
      </Text>

      {orders.length === 0 ? (
        <Text style={{ color: "#94a3b8" }}>
          Nu ai comenzi încă
        </Text>
      ) : (
        orders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: "#1e293b",
              padding: 14,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {order.item.title}
            </Text>

            <Text style={{ color: "#22c55e" }}>
              {order.item.price}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              Rezervat
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}