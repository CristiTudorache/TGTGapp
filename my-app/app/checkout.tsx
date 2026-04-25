import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useApp } from "../context/AppContext";

export default function Checkout() {
  const router = useRouter();
  const { item } = useLocalSearchParams();

  const parsedItem = item ? JSON.parse(item as string) : null;

  const { cards, addCard, addOrder } = useApp();

  const [method, setMethod] = useState<"card" | "cash">("card");
  const [cardMode, setCardMode] = useState<"new" | "saved">("new");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    if (method === "card") {
      if (cardMode === "new") {
        if (!cardNumber || !cardName || !expiry || !cvv) return;

        addCard({
          id: Date.now().toString(),
          number: cardNumber,
          name: cardName,
          expiry,
        });
      }

      if (cardMode === "saved" && !selectedCardId) return;
    }

    addOrder({
      id: Date.now().toString(),
      item: parsedItem,
      date: Date.now(),
    });

    router.replace({
      pathname: "/main",
      params: { tab: "orders" },
    });
  };

  const input = {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0f172a", padding: 16 }}>
      
      <Pressable onPress={() => router.back()} style={{ marginBottom: 10 }}>
        <Text style={{ color: "#22c55e" }}>← Înapoi</Text>
      </Pressable>

      {parsedItem && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {parsedItem.title}
          </Text>
          <Text style={{ color: "#22c55e" }}>{parsedItem.price}</Text>
        </View>
      )}

      <Text style={{ color: "white", marginBottom: 10 }}>
        Alege metoda de plată
      </Text>

      <Pressable
        onPress={() => setMethod("card")}
        style={{
          padding: 14,
          borderRadius: 10,
          backgroundColor: method === "card" ? "#22c55e33" : "#1e293b",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white" }}>Plată cu cardul</Text>
      </Pressable>

      <Pressable
        onPress={() => setMethod("cash")}
        style={{
          padding: 14,
          borderRadius: 10,
          backgroundColor: method === "cash" ? "#22c55e33" : "#1e293b",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white" }}>Plată la ridicare</Text>
      </Pressable>

      {method === "card" && (
        <>
          <Pressable onPress={() => setCardMode("new")} style={{ marginBottom: 10 }}>
            <Text style={{ color: "white" }}>Card nou</Text>
          </Pressable>

          <Pressable onPress={() => setCardMode("saved")} style={{ marginBottom: 10 }}>
            <Text style={{ color: "white" }}>Card salvat</Text>
          </Pressable>

          {cardMode === "saved" &&
            cards.map((card) => (
              <Pressable
                key={card.id}
                onPress={() => setSelectedCardId(card.id)}
              >
                <Text style={{ color: "white" }}>
                  •••• {card.number.slice(-4)}
                </Text>
              </Pressable>
            ))}

          {cardMode === "new" && (
            <>
              <TextInput style={input} placeholder="Număr card" value={cardNumber} onChangeText={setCardNumber} />
              <TextInput style={input} placeholder="Nume titular" value={cardName} onChangeText={setCardName} />
              <TextInput style={input} placeholder="MM/YY" value={expiry} onChangeText={setExpiry} />
              <TextInput style={input} placeholder="CVV" value={cvv} onChangeText={setCvv} secureTextEntry />
            </>
          )}
        </>
      )}

      <Pressable onPress={handlePay} style={{ backgroundColor: "#22c55e", padding: 16, borderRadius: 12 }}>
        <Text style={{ textAlign: "center", color: "white" }}>
          Plătește {parsedItem?.price}
        </Text>
      </Pressable>
    </ScrollView>
  );
}