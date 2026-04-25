import React from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useApp } from "../context/AppContext";

export default function Product() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const { factura } = useApp();

  const parsedItem = item ? JSON.parse(item as string) : null;

  const formatTime = (hour: number) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const formatted = hour % 12 === 0 ? 12 : hour % 12;
    return `${formatted}${suffix}`;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const end = parsedItem?.pickupEnd ? parsedItem.pickupEnd * 60 : null;
  const isClosed = end !== null ? currentMinutes >= end : false;

  if (!parsedItem) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <Image source={{ uri: parsedItem.image }} style={{ width: "100%", height: 220 }} />

      <View style={{ padding: 16 }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          {parsedItem.title}
        </Text>

        <Text style={{ color: "#22c55e", fontSize: 18, marginTop: 10 }}>
          {parsedItem.price}
        </Text>

        <Text style={{ color: "#94a3b8", marginTop: 10 }}>
          📅 {formatTime(parsedItem.pickupStart)} - {formatTime(parsedItem.pickupEnd)}
        </Text>

        <Text style={{ color: isClosed ? "#ef4444" : "#22c55e", marginTop: 6 }}>
          {isClosed ? "Închis" : "Deschis"}
        </Text>
      </View>

      <View style={{ padding: 16 }}>
        <Pressable
          disabled={isClosed}
          onPress={() => {
            if (isClosed) return;

            if (!factura) {
              router.push({
                pathname: "/facturi",
                params: { item: JSON.stringify(parsedItem) },
              });
            } else {
              router.push({
                pathname: "/checkout",
                params: { item: JSON.stringify(parsedItem) },
              });
            }
          }}
          style={{
            backgroundColor: isClosed ? "#475569" : "#22c55e",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            {isClosed ? "Închis" : "Rezervă"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}